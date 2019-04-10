import { Controller, Get, Query, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../shared/decorators/roles.decorator';
import { RolesGuard } from '../shared/guards/roles.guard';
import { UserRole } from '../users/models/user-role.enum';

@Controller('permissions')
@UseGuards(AuthGuard(), RolesGuard)
@Roles(UserRole.Admin)
export class PermissionController {
    constructor(private permissionService: PermissionService) {}

    @Get()
    findAll(@Query() query) {
        return this.permissionService.findAll();
    }

    @Put(':id')
    update(@Param('id') id, @Body() dto) {
        return this.permissionService.update(id, dto);
    }

    @Post()
    create(@Body() dto) {
        return this.permissionService.create(dto);
    }

}
