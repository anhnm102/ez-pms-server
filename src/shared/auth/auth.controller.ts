import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Controller()
export class AuthController {
    constructor(private usersService: UsersService) {}
    
    @Post('register')
    async register(@Body() register) {
        return 'ok...';
    }

    @Post('login')
    async login(@Body() loginForm) {
        return this.usersService.login(loginForm);
    }
}
