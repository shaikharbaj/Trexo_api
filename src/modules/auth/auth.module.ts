import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MODULE_CONFIG } from './module.config';

const AUTH_MS_TRANSPORT = MODULE_CONFIG.transport;

@Module({
  imports: [ClientsModule.register([MODULE_CONFIG[AUTH_MS_TRANSPORT]])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
