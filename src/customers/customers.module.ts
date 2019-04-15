import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../shared/shared.module';
import { PermissionModule } from '../permissions/permission.module';
import { CustomersService } from './customers.service';
import { CustomerSchema } from './customer.schema';
import { CustomersController } from './customers.controller';

@Module({
  imports: [
    forwardRef(() => SharedModule),
    PermissionModule,
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }])],
  providers: [CustomersService],
  controllers: [CustomersController],
  exports: [CustomersService],
})
export class CustomersModule {}
