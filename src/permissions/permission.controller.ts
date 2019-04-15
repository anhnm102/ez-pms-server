import { Controller, Get, Body, Put, UseGuards, Request } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../shared/decorators/roles.decorator';
import { RolesGuard } from '../shared/guards/roles.guard';
import { UserRole } from '../users/models/user-role.enum';

@Controller('permissions')
@UseGuards(AuthGuard(), RolesGuard)
export class PermissionController {
    constructor(private permissionService: PermissionService) {}

    @Get()
    @Roles(UserRole.Admin)
    findAll() {
        return this.permissionService.findAll();
    }

    @Get()
    @Roles(UserRole.Owner)
    findOne(@Request() req) {
        const q = {ownerId: req.user.ownerId};
        return this.permissionService.findOne(q);
    }

    @Put()
    @Roles(UserRole.Owner)
    update(@Body() dto, @Request() req) {
        const ownerId = req.user.ownerId;
        dto.ownerId = ownerId;
        return this.permissionService.update({ownerId: ownerId},dto);
    }

}
