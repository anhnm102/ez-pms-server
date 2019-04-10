import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PermissionService {
    constructor(@InjectModel('Permission') private readonly permissionModel: Model<any>,) {}

    async findAll(filter = {}) {
        return await this.permissionModel.find(filter);
    }

    async findOne(filter = {}) {
        return await this.permissionModel.findOne(filter).exec();
    }

    async update(id, dto) {
        return await this.permissionModel.findByIdAndUpdate(id, dto);
    }

    async create(dto) {
        return await this.permissionModel.create(dto);
    }

}
