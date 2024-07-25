/**
 * @fileoverview
 * Social media controller file to handle all the social media requests.
 *
 * @version
 * API version 1.0.
 *
 * @author
 * KATALYST TEAM
 *
 * @license
 * Licensing information, if applicable.
 */
import {
  Controller,
  Get,
  Post,
  HttpStatus,
  HttpException,
  Param,
  Body,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { SOCIAL_MEDIA_MODULE_PERMISSION } from './permission';
import { AuthGuard, LangGuard, RoleGuard } from '../auth/guard';
import { Auth, HasPermission, Lang } from 'src/common/decorators';
import { SocialMediaService } from './social-media.service';
import {
  CreateSocialMediaBody,
  ToggleSocialMediaVisibilityBody,
  UpdateSocialMediaBody
} from './types';

@Controller('social-media')
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) { }

  /**
 * @description
 * Rest API to fetch all the social media
 */
  @HasPermission(SOCIAL_MEDIA_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get()
  async fetchAllSocialMedia(@Query() { page, searchText }: any, @Lang() lang: string,) {
    try {
      const response: any = await this.socialMediaService.fetchAllSocialMedia(page, searchText, lang);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response.data,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @description
   * Rest API to fetch social media by given id
   */
  @HasPermission(SOCIAL_MEDIA_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get(':uuid')
  async findSocialMediaById(@Param('uuid') uuid: string, @Lang() lang: string,) {
    try {
      const response: any = await this.socialMediaService.findSocialMediaById(uuid, lang);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response.data,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @description
   * Rest API to create social media
   */
  @HasPermission(SOCIAL_MEDIA_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Post()
  async createSocialMedia(@Auth() auth: any, @Lang() lang: string, @Body() data: CreateSocialMediaBody) {
    try {
      const response: any = await this.socialMediaService.createSocialMedia(auth, lang, data);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @description
   * Rest API to update social media visibility i.e: active, inactive
   */
  @HasPermission(SOCIAL_MEDIA_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch('toggle/visibility/:uuid')
  async toggleSocialMediaVisibility(
    @Param('uuid') uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() body: ToggleSocialMediaVisibilityBody,
  ) {
    try {
      const response: any = await this.socialMediaService.toggleSocialMediaVisibility(
        uuid,
        auth,
        lang,
        body
      );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @description
   * Rest API to update social media
   */
  @HasPermission(SOCIAL_MEDIA_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch(':uuid')
  async updateSocialMedia(
    @Param('uuid') uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() data: UpdateSocialMediaBody,
  ) {
    try {
      const response: any = await this.socialMediaService.updateSocialMedia(
        uuid,
        auth,
        lang,
        data,
      );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @description
   * Rest API to delete social media
   */
  @HasPermission(SOCIAL_MEDIA_MODULE_PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Delete(':uuid')
  async deleteSocialMedia(@Param('uuid') uuid: string, @Lang() lang: string) {
    try {
      const response: any = await this.socialMediaService.deleteSocialMedia(uuid, lang);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
