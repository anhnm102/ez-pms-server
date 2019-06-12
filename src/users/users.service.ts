import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { AuthService } from '../shared/auth/auth.service';
import { BaseService } from '../shared/services/base.service';

@Injectable()
export class UsersService extends BaseService {
    constructor(@InjectModel('User') private readonly userModel: Model<any>,
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService) {
        super();
        this._model = userModel;
    }

    async findOne(filter = {}, includePassword?) {
        return await this.userModel.findOne(filter).select(includePassword ? '+password' : '');
    }

    /**
     * all created user should be role Staff.
     * different permission is granted in attribute: permission
     * @see UserSchema for details
     */
    async create(dto) {
        const salt = await genSalt();
        dto.password = await hash(dto.password, salt);
        
        return super.create(dto);
    }

    async login(form) {
        const { email, password} = form;
        const user = await this.findOne({email : email}, true);

        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.NOT_FOUND);
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
        }

        const payLoad = {
            ownerId: user.role === 'Owner' ? user._id : user.ownerId,
            name: user.name,
            email: user.email,
            role: user.role
        }

        const token = await this.authService.signPayload(payLoad);
        return {
            token: token,
            username: user.name,
            role: user.role,
        };
    }
}
