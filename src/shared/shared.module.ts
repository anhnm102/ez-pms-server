import { Module, forwardRef, HttpModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthController } from './auth/auth.controller';
import config from './config';
import { QuoteService } from './services/quote/quote.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: config.secretKey,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    forwardRef(() => UsersModule),
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, QuoteService],
  exports: [PassportModule, AuthService],
})
export class SharedModule {}
