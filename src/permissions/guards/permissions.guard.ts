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
    const permissions = this.reflector.get<UserPermission[]>('permissions', context.getHandler());

    // no permission required
    if (!permissions || permissions.length === 0) {
        return true;
    }

    const request = context.switchToHttp().getRequest();
    const userPermissions = await this.permissionService.findOne({name: request.user.permission});
    console.log(userPermissions);

    if (permissions.every(p => userPermissions.indexOf(p) >= 0)) {
        return true;
    }

    throw new HttpException('You do not have permission', HttpStatus.UNAUTHORIZED);
  }
}
