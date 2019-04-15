import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CustomersService {
    constructor(
        @InjectModel('Customer') private readonly customerModel: Model<any>
    ) {}

    async findAll(filter = {}) {
        return await this.customerModel.find(filter);
    }

    async findById(id) {
        return await this.customerModel.findById(id);
    }
    async create(dto) {
        try {
            return await this.customerModel.create(dto);
            
        } catch(error) {
            if (error.name === 'MongoError' && error.code === 11000) {
                throw new HttpException('There was a duplicate key error', HttpStatus.CONFLICT);
            } else {
                throw new HttpException(error.errmsg, HttpStatus.BAD_REQUEST);
            }
        }
    }

    async delete(id) {
        return await this.customerModel.findByIdAndDelete(id);
    }

    async update(id, dto) {
        return await this.customerModel.findByIdAndUpdate(id, dto);
    }
}
