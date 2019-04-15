import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PermissionService {
    constructor(@InjectModel('Permission') private readonly permissionModel: Model<any>,) {}

    async findOne(filter = {}) {
        return await this.permissionModel.findOne(filter);
    }

    async update(filter, dto) {
        return await this.permissionModel.updateOne(filter, dto, {upsert : true});
    }

    async createDefault(ownerId) {
        const rules = [
            {
                ownerId: ownerId,
                groupName: 'Basic',
                actions: ['FindAllUser']
            },
            {
                ownerId: ownerId,
                groupName: 'Medium',
                actions: ['AddUser','EditUser','DeleteUser','FindAllUser','FindOneUser','AddCustomer','EditCustomer','DeleteCustomer','FindAllCustomer','FindOneCustomer',]
            },
            {
                ownerId: ownerId,
                groupName: 'High',
                actions: ['AddUser','EditUser','DeleteUser','FindAllUser','FindOneUser','AddCustomer','EditCustomer','DeleteCustomer','FindAllCustomer','FindOneCustomer',]
            },
        ]
        return await this.permissionModel.create(rules);
    }

}
