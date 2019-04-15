import { Controller, Get, Body, Put, UseGuards, Request } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../shared/decorators/roles.decorator';
import { RolesGuard } from '../shared/guards/roles.guard';
import { UserRole } from '../users/models/user-role.enum';

@Controller('permissions')
@UseGuards(AuthGuard(), RolesGuard)
export class PermissionController {
    constructor(
        private permissionService: PermissionService
    ) {}

    @Get('all')
    @Roles(UserRole.Admin)
    findAll() {
        return this.permissionService.findAll();
    }

    @Get()
    async findOne(@Request() req) {
        const user = req.user;
        const q = {ownerId: user.ownerId};
        const permission = await this.permissionService.findOne(q);
        if (user.role === "Owner") {
            return permission;
        } else {
            return permission.permissionDetail.find(p => p.level === user.permission);
        }
    }

    @Put()
    @Roles(UserRole.Owner)
    update(@Body() dto, @Request() req) {
        const ownerId = req.user.ownerId;
        dto.ownerId = ownerId;
        return this.permissionService.update({ownerId: ownerId},dto);
    }

}
