import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {

    constructor(@Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
    ) {}

    async signPayload(payLoad) {
        return await this.jwtService.sign(payLoad);
    }

    async validateUser(payload) {
        return await this.userService.findOne({ email: payload.email });
    }
}
