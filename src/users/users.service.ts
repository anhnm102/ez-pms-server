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

    async create(dto) {
        const salt = await genSalt();
        dto.password = await hash(dto.password, salt);
        return await this.userModel.create(dto);
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
            name: user.name,
            email: user.email,
            permission: user.permission,
            role: user.role
        }
        console.log(payLoad);

        const token = await this.authService.signPayload(payLoad);
        return {
            token: token,
            user: {
                name: user.name,
                role: user.role,
            }
        };
    }
}
