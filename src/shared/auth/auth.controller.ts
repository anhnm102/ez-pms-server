import { Controller, Post, Body, Get } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { ObjectId } from 'bson';
import { PermissionService } from '../../permissions/permission.service';
import { QuoteService } from '../services/quote/quote.service';

@Controller()
export class AuthController {
    constructor(
        private usersService: UsersService,
        private permissionService: PermissionService,
        private quoteService: QuoteService,
    ) {}
    
    @Post('register')
    async register(@Body() registerForm) {
        const id = new ObjectId();
        registerForm.role = "Owner";
        registerForm._id = id;
        registerForm.ownerId = id;
        registerForm.permission = "Owner";

        // create default permission rule
        this.permissionService.createDefault(id);

        return await this.usersService.create(registerForm);
    }

    @Post('login')
    async login(@Body() loginForm) {
        return this.usersService.login(loginForm);
    }

    // for fun
    @Get('quotes')
    randomQuote() {
        return this.quoteService.getQuotes();
    }
}
