import * as mongoose from 'mongoose';

export const PermissionSchema = new  mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: {
      type: Array,
    },
});