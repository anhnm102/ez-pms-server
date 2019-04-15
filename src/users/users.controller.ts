import { Controller, Get, Query, Post, Body, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../shared/decorators/roles.decorator';
import { UserRole } from './models/user-role.enum';
import { RolesGuard } from '../shared/guards/roles.guard';
import { PermissionsGuard } from '../permissions/guards/permissions.guard';
import { Permission } from '../shared/decorators/permissions.decorator';
import { UserPermission } from './models/user-permission.enum';

@Controller('users')
@UseGuards(AuthGuard(), RolesGuard)
@UseGuards(AuthGuard(), PermissionsGuard)
@Roles(UserRole.Admin, UserRole.User, UserRole.Owner, UserRole.Staff)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @Permission(UserPermission.FindAllUser)
    findAll(@Query() query, @Request() req) {
        const q = {ownerId: req.user.ownerId};
        return this.usersService.findAll(q);
    }

    @Get(':id')
    @Permission(UserPermission.FindOneUser)
    findOne(@Param('id') id, @Request() req) {
        return this.usersService.findById(id);
    }

    @Post()
    @Permission(UserPermission.AddUser)
    create(@Body() dto, @Request() req) {
        dto.ownerId = req.user.ownerId;
        dto.role = "Staff";
        return this.usersService.create(dto);
    }

    @Put(':id')
    @Permission(UserPermission.EditUser)
    update(@Param('id') id, @Body() dto) {
        return this.usersService.update(id, dto);
    }

    @Delete(':id')
    @Permission(UserPermission.DeleteUser)
    delete(@Param('id') id) {
        return this.usersService.delete(id);
    }

}
