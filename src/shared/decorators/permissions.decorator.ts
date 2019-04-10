import { ReflectMetadata } from '@nestjs/common';
import { UserPermission } from '../../users/models/user-permission.enum';

export const Permissions = (...permissions: UserPermission[]) => ReflectMetadata('Permissions', permissions);
