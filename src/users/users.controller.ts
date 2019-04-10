import { Controller, Get, Query, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../shared/decorators/roles.decorator';
import { UserRole } from './models/user-role.enum';
import { RolesGuard } from '../shared/guards/roles.guard';
import { PermissionsGuard } from '../permissions/guards/permissions.guard';
import { Permissions } from '../shared/decorators/permissions.decorator';
import { UserPermission } from './models/user-permission.enum';

@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
@UseGuards(AuthGuard(), PermissionsGuard)
@Roles(UserRole.Admin, UserRole.User)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAll(@Query() query) {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id) {
        return this.usersService.findById(id);
    }

    @Post()
    @Permissions(UserPermission.AddUser)
    create(@Body() dto) {
        return this.usersService.create(dto);
    }

    @Put(':id')
    @Permissions(UserPermission.EditUser)
    update(@Param('id') id, @Body() dto) {
        return this.usersService.update(id, dto);
    }

    @Delete(':id')
    @Permissions(UserPermission.DeleteUser)
    delete(@Param('id') id) {
        return this.usersService.delete(id);
    }

}
