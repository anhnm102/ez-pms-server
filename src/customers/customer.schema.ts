import * as mongoose from 'mongoose';

export const CustomerSchema = new  mongoose.Schema({
    ownerId: String,
    status: String,
    name: String,
    phone: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
});