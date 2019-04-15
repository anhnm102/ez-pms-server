import { Controller, Get, Body, Put, UseGuards, Request } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../shared/decorators/roles.decorator';
import { RolesGuard } from '../shared/guards/roles.guard';
import { UserRole } from '../users/models/user-role.enum';

@Controller('permissions')
@UseGuards(AuthGuard(), RolesGuard)
@Roles(UserRole.Admin, UserRole.Owner)
export class PermissionController {
    constructor(private permissionService: PermissionService) {}

    @Get()
    findAll(@Request() req) {
        const q = {ownerId: req.user.ownerId};
        return this.permissionService.findOne(q);
    }

    @Put()
    update(@Body() dto, @Request() req) {
        const ownerId = req.user.ownerId;
        dto.ownerId = ownerId;
        return this.permissionService.update({ownerId: ownerId},dto);
    }

}
