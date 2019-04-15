import { SetMetadata } from '@nestjs/common';
import { UserPermission } from '../../users/models/user-permission.enum';

export const Permission = (permission: UserPermission) => SetMetadata('permission', permission);
