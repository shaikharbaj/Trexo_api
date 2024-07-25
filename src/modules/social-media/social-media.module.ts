import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { MODULE_CONFIG } from "./module.config";
import { AuthModule } from "../auth/auth.module";
import { SocialMediaController } from "./social-media.controller";
import { SocialMediaService } from "./social-media.service";

const CMS_MS_TRANSPORT = MODULE_CONFIG.transport;

@Module({
  imports: [
    ClientsModule.register([MODULE_CONFIG[CMS_MS_TRANSPORT]]),
    AuthModule,
  ],
  controllers: [SocialMediaController],
  providers: [SocialMediaService],
})
export class SocialMediaModule { }
