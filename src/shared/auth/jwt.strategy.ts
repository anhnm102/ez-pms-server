import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import config from '../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: config.secretKey,
        });
      }

      async validate(payload) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
      }
}