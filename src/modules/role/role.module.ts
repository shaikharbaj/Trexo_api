import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from '../auth/auth.module';
import { MODULE_CONFIG } from './module.config';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

const ROLE_MS_TRANSPORT = MODULE_CONFIG.transport;

@Module({
  imports: [ClientsModule.register([MODULE_CONFIG[ROLE_MS_TRANSPORT]]),AuthModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule { }
