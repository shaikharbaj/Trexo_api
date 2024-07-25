import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from '../auth/auth.module';
import { MODULE_CONFIG } from './module.config';
import { AdminController, UserController } from './controllers';
import { AdminService, UserService } from './services';

const USER_MS_TRANSPORT = MODULE_CONFIG.transport;

@Module({
  imports: [ClientsModule.register([MODULE_CONFIG[USER_MS_TRANSPORT]]), AuthModule],
  controllers: [AdminController, UserController],
  providers: [AdminService, UserService],
  exports: [AdminService, UserService],
})
export class UserModule {}
