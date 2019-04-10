import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { SharedModule } from '../shared/shared.module';
import { PermissionModule } from '../permissions/permission.module';

@Module({
  imports: [
    forwardRef(() => SharedModule),
    PermissionModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
