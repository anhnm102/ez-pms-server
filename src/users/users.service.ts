import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<any>) {}

    findAll() {
        return this.userModel.find();
    }

    findOne(id) {
        return this.userModel.findById(id);
    }

    async validate(email, password) {
        const user = await <any>this.userModel.findOne({ email: email });
        const rs = await bcrypt.compare(password, user.password);
        return rs ? 'ok' : 'failed';
    }

    async create(dto) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(dto.password, salt);
        dto.password = hash;
        return await this.userModel.create(dto);
    }

    delete(id) {
        return this.userModel.findByIdAndDelete(id);
    }

    update(id, dto) {
        return this.userModel.findByIdAndUpdate(id, dto);
    }
}
