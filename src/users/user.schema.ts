import * as mongoose from 'mongoose';

export const UserSchema = new  mongoose.Schema({
    ownerId: String,
    status: String,
    role: String,
    name: String,
    phone: String,
    permission: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
});