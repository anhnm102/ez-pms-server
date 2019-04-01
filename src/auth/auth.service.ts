import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}

    async validate(login) {
        return await this.userService.validate(login.email, login.password);
    }
}
