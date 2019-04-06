import { ReflectMetadata } from '@nestjs/common';
import { UserRole } from '../../users/models/user-role.enum';

export const Roles = (...roles: UserRole[]) => ReflectMetadata('roles', roles);
