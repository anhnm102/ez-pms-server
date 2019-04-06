import * as mongoose from 'mongoose';

export const UserSchema = new  mongoose.Schema({
    id: String,
    name: String,
    mobile: String,
    role: String,
    status: String,
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