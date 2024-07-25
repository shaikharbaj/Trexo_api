import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from '../auth/auth.module';
import { MODULE_CONFIG } from './module.config';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

const PERMISSION_MS_TRANSPORT = MODULE_CONFIG.transport;

@Module({
  imports: [
    ClientsModule.register([
      MODULE_CONFIG[PERMISSION_MS_TRANSPORT],
    ]),
    AuthModule,
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule { }
