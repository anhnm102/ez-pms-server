import { Controller, Get, Query, Post, Body, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../shared/decorators/roles.decorator';
import { RolesGuard } from '../shared/guards/roles.guard';
import { PermissionsGuard } from '../permissions/guards/permissions.guard';
import { Permission } from '../shared/decorators/permissions.decorator';
import { UserRole } from '../users/models/user-role.enum';
import { UserPermission } from '../users/models/user-permission.enum';
import { CustomersService } from './customers.service';

@Controller('customers')
@UseGuards(AuthGuard(), RolesGuard)
@UseGuards(AuthGuard(), PermissionsGuard)
@Roles(UserRole.Admin, UserRole.User, UserRole.Owner, UserRole.Staff)
export class CustomersController {
    constructor(private customerService: CustomersService) {}

    @Get()
    @Permission(UserPermission.FindAllCustomer)
    findAll(@Query() query, @Request() req) {
        const q = {ownerId: req.user.ownerId};
        return this.customerService.findAll(q);
    }

    @Get(':id')
    @Permission(UserPermission.FindOneCustomer)
    findOne(@Param('id') id, @Request() req) {
        return this.customerService.findById(id);
    }

    @Post()
    @Permission(UserPermission.AddCustomer)
    create(@Body() dto, @Request() req) {
        dto.ownerId = req.user.ownerId;
        return this.customerService.create(dto);
    }

    @Put(':id')
    @Permission(UserPermission.EditCustomer)
    update(@Param('id') id, @Body() dto) {
        return this.customerService.update(id, dto);
    }

    @Delete(':id')
    @Permission(UserPermission.DeleteCustomer)
    delete(@Param('id') id) {
        return this.customerService.delete(id);
    }

}
