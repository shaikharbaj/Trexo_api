import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from '../auth/auth.module';
import { MODULE_CONFIG } from './module.config';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';

const FAQ_MS_TRANSPORT = MODULE_CONFIG.transport;

@Module({
  imports: [
    ClientsModule.register([MODULE_CONFIG[FAQ_MS_TRANSPORT]]),
    AuthModule,
  ],
  providers: [FaqService],
  controllers: [FaqController],
})
export class FaqModule {}
