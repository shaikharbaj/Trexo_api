import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MODULE_CONFIG } from './module.config';
import { ContactUsController } from './contact-us.controller';
import { ContactUsService } from './contact-us.service';
import { AuthModule } from '../auth/auth.module';

const MASTER_MS_TRANSPORT = MODULE_CONFIG.transport;

@Module({
  imports: [ClientsModule.register([MODULE_CONFIG[MASTER_MS_TRANSPORT]]), AuthModule],
  controllers: [ContactUsController],
  providers: [ContactUsService],
})
export class ContactUsModule { }
