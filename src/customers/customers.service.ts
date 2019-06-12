import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../shared/services/base.service';

@Injectable()
export class CustomersService extends BaseService {
    constructor(
        @InjectModel('Customer') private readonly customerModel: Model<any>
    ) {
        super();
        this._model = customerModel;
    }
}
