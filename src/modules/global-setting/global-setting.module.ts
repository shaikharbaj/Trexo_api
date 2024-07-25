import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { MODULE_CONFIG } from "./module.config";
import { AuthModule } from "../auth/auth.module";
import { GlobalSettingController } from "./global-setting.controller";
import { GlobalSettingService } from "./global-setting.service";

const CMS_MS_TRANSPORT = MODULE_CONFIG.transport;

@Module({
  imports: [
    ClientsModule.register([MODULE_CONFIG[CMS_MS_TRANSPORT]]),
    AuthModule,
  ],
  controllers: [GlobalSettingController],
  providers: [GlobalSettingService],
})
export class GlobalSettingModule { }
