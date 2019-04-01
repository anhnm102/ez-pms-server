import * as mongoose from 'mongoose';

export const UserSchema = new  mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    mobile: String,
    role: String,
    status: String,
});