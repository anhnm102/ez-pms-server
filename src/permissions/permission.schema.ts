import * as mongoose from 'mongoose';

export const PermissionSchema = new  mongoose.Schema({
    ownerId: {
      type: String,
      required: true,
    },
    permissionDetail: Array,
});