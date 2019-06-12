import { Types } from "mongoose";
import { HttpException, HttpStatus } from "@nestjs/common";

export abstract class BaseService {
    protected _model;

    async findAll(filter = {}) {
        return this._model.find(filter).exec();
    }

    async findOne(filter = {}) {
        return this._model.findOne(filter).exec();
    }

    async findById(id) {
        return this._model.find(this.toObjectId(id)).exec();
    }

    async create(item) {
        try {
            return await this._model.create(item);
        } catch(error) {
            if (error.name === 'MongoError' && error.code === 11000) {
                throw new HttpException('There was a duplicate key error', HttpStatus.CONFLICT);
            } else {
                throw new HttpException(error.errmsg, HttpStatus.BAD_REQUEST);
            }
        }
    }

    async delete(id: string) {
        return this._model.findByIdAndRemove(this.toObjectId(id)).exec();
    }

    async update(id: string, item) {
        return this._model.findByIdAndUpdate(this.toObjectId(id), item).exec();
    }

    async clearCollection(filter = {}) {
        return this._model.deleteMany(filter).exec();
    }

    private toObjectId(id): Types.ObjectId {
        return Types.ObjectId(id);
    }
}