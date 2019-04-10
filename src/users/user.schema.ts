import * as mongoose from 'mongoose';

export const UserSchema = new  mongoose.Schema({
    id: String,
    name: String,
    phone: String,
    role: String,
    status: String,
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