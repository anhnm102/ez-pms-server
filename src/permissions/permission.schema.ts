import * as mongoose from 'mongoose';

export const PermissionSchema = new  mongoose.Schema({
    ownerId: {
      type: String,
      required: true,
    },
    groupName: {
      type: String,
      required: true,
    },
    actions: {
      type: Array,
      required: true,
    },
});