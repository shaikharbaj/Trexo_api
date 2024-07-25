import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MODULE_CONFIG } from './module.config';
import { DivisionController } from './division.controller';
import { DivisionService } from './division.service';
import { AuthModule } from '../auth/auth.module';

const MASTER_MS_TRANSPORT = MODULE_CONFIG.transport;

@Module({
  imports: [ClientsModule.register([MODULE_CONFIG[MASTER_MS_TRANSPORT]]), AuthModule],
  controllers: [DivisionController],
  providers: [DivisionService],
})
export class DivisionModule { }
