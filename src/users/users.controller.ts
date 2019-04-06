import { Controller, Get, Query, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../shared/decorators/roles.decorator';
import { UserRole } from './models/user-role.enum';
import { RolesGuard } from '../shared/guards/roles.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @Roles(UserRole.Admin, UserRole.User)
    @UseGuards(AuthGuard(), RolesGuard)
    findAll(@Query() query) {
        return this.usersService.findAll();
    }

    @Get(':id')
    @Roles(UserRole.Admin, UserRole.User)
    @UseGuards(AuthGuard(), RolesGuard)
    findOne(@Param('id') id) {
        return this.usersService.findById(id);
    }

    @Post()
    create(@Body() dto) {
        return this.usersService.create(dto);
    }

    @Put(':id')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    update(@Param('id') id, @Body() dto) {
        return this.usersService.update(id, dto);
    }

    @Delete(':id')
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    delete(@Param('id') id) {
        return this.usersService.delete(id);
    }

    @Post('register')
    async register(@Body() register) {
        return 'ok...';
    }

    @Post('login')
    async login(@Body() loginForm) {
        return this.usersService.login(loginForm);
    }

}
