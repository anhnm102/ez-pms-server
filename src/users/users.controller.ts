import { Controller, Get, Query, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAll(@Query() query) {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id) {
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body() dto) {
        return this.usersService.create(dto);
    }

    @Put(':id')
    update(@Param('id') id, @Body() dto) {
        return this.usersService.update(id, dto);
    }

    @Delete(':id')
    delete(@Param('id') id) {
        return this.usersService.delete(id);
    }


}
