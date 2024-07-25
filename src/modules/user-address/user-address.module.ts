import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MODULE_CONFIG } from './module.config';
import { AuthModule } from '../auth/auth.module';
import { UserAddressController } from './user-address.controller';
import { UserAddressService } from './user-address.service';
const USER_ADDRESS_MS_TRANSPORT = MODULE_CONFIG.transport;

@Module({
  imports: [ClientsModule.register([MODULE_CONFIG[USER_ADDRESS_MS_TRANSPORT]]),AuthModule],
  controllers: [UserAddressController],
  providers: [UserAddressService],
})
export class UserAddressModule {}
