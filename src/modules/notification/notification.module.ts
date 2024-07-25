import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthModule } from '../auth/auth.module';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { MODULE_CONFIG } from './module.config';
const NOTIFICATION_MS_TRANSPORT = MODULE_CONFIG.transport;
@Module({
  imports: [
    ClientsModule.register([
     MODULE_CONFIG[NOTIFICATION_MS_TRANSPORT]
    ]),
    AuthModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
