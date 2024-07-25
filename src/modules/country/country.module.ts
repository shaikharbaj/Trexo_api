import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MODULE_CONFIG } from './module.config';
import { AuthModule } from '../auth/auth.module';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';

const MASTER_MS_TRANSPORT = MODULE_CONFIG.transport;

@Module({
  imports: [
    ClientsModule.register([MODULE_CONFIG[MASTER_MS_TRANSPORT]]),
    AuthModule,
  ],
  providers: [CountryService],
  controllers: [CountryController],
})
export class CountryModule {}
