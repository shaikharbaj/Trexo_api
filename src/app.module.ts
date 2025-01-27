import { Module } from "@nestjs/common";
import {
  AuthModule,
  UserModule,
  CountryModule,
  StateModule,
  RoleModule,
  PermissionModule,
  CityModule,
  TaxModule,
  UserAddressModule,
  BrandModule,
  ContactUsModule,
  CmsModule,
  DivisionModule,
  FaqModule,
  TestimonialModule,
  SocialMediaModule,
  CategoryModule,
  GlobalSettingModule,
  NotificationModule,
} from "./modules";

@Module({
  imports: [
    AuthModule,
    UserModule,
    CountryModule,
    StateModule,
    RoleModule,
    PermissionModule,
    CityModule,
    TaxModule,
    CmsModule,
    UserAddressModule,
    BrandModule,
    FaqModule,
    ContactUsModule,
    BrandModule,
    DivisionModule,
    BrandModule,
    FaqModule,
    TestimonialModule,
    SocialMediaModule,
    CategoryModule,
    GlobalSettingModule,
    NotificationModule
  ],
})
export class AppModule { }
