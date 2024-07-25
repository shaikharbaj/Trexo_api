import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { MODULE_CONFIG } from './module.config';
import { AuthModule } from '../auth/auth.module';
import { CityController } from './city.controller';
import { CityService } from './city.service';

const MASTER_MS_TRANSPORT = MODULE_CONFIG.transport;

@Module({
  imports: [
    ClientsModule.register([MODULE_CONFIG[MASTER_MS_TRANSPORT]]),
    AuthModule,
  ],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
