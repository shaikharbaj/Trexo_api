import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MODULE_CONFIG } from './module.config';
import { AuthModule } from '../auth/auth.module';
import { TaxController } from './tax.controller';
import { TaxService } from './tax.service';
const TAX_MS_TRANSPORT = MODULE_CONFIG.transport;

@Module({
  imports: [ClientsModule.register([MODULE_CONFIG[TAX_MS_TRANSPORT]]),AuthModule],
  controllers: [TaxController],
  providers: [TaxService],
})
export class TaxModule {}
