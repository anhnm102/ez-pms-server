import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { AuthService } from '../shared/auth/auth.service';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<any>,
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService) {}

    async findAll(filter = {}) {
        return await this.userModel.find(filter);
    }

    async findById(id) {
        return await this.userModel.findById(id);
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

        try {
            return await this.userModel.create(dto);
            
        } catch(error) {
            if (error.name === 'MongoError' && error.code === 11000) {
                throw new HttpException('There was a duplicate key error', HttpStatus.CONFLICT);
            } else {
                throw new HttpException(error.errmsg, HttpStatus.BAD_REQUEST);
            }
        }

    }

    async delete(id) {
        return await this.userModel.findByIdAndDelete(id);
    }

    async update(id, dto) {
        return await this.userModel.findByIdAndUpdate(id, dto);
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
