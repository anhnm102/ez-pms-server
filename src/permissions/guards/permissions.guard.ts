import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserPermission } from '../../users/models/user-permission.enum';
import { PermissionService } from '../permission.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(
    context: ExecutionContext,
  ) {
    const permissionRequired = this.reflector.get<UserPermission>('permission', context.getHandler());

    // no permission required
    if (!permissionRequired || permissionRequired.length === 0) {
        return true;
    }

    const request = context.switchToHttp().getRequest();

    if (request.user.role == 'Owner' || request.user.role == 'Admin') { // Admin & Owner always has all permissions.
      return true;
    }

    const { permission, ownerId } = request.user;
    const userPermission = await this.permissionService.findOne({groupName: permission, ownerId: ownerId});

    if (userPermission.actions.indexOf(permissionRequired) >= 0) {
        return true;
    }

    throw new HttpException('You do not have permission', HttpStatus.UNAUTHORIZED);
  }
}
