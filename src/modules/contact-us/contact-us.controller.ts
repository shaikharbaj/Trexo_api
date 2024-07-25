/**
 * @fileoverview
 * Contact us controller file to handle all the contact us requests.
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
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CONTACT_US_MODULE_PERMISSION } from './permission';
import { AuthGuard, LangGuard, RoleGuard } from '../auth/guard';
import { Auth, HasPermission, Lang } from 'src/common/decorators';
import { ContactUsService } from './contact-us.service';
import {
  CreateContactUsBody,
} from './types';

@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) { }

  /**
 * @description
 * Rest API to fetch all the contact us
 */
  @HasPermission(CONTACT_US_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get()
  async fetchAllContactUs(@Query() { page, searchText }: any, @Lang() lang: string) {
    try {
      const response: any = await this.contactUsService.fetchAllContactUs(page, searchText, lang);
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
   * Rest API to fetch contact us by given id
   */
  @HasPermission(CONTACT_US_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get(':uuid')
  async findContactUsById(@Param('uuid') uuid: string, @Lang() lang: string) {
    try {
      const response: any = await this.contactUsService.findContactUsById(uuid, lang);
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
   * Rest API to create contact us
   */
  @HasPermission(CONTACT_US_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Post()
  async createContactUs(@Auth() auth: any, @Lang() lang: string, @Body() data: CreateContactUsBody) {
    try {
      const response: any = await this.contactUsService.createContactUs(auth, lang, data);
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
   * Rest API to delete contact us
   */
  @HasPermission(CONTACT_US_MODULE_PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Delete(':uuid')
  async deleteContactUs(@Param('uuid') uuid: string, @Lang() lang: string) {
    try {
      const response: any = await this.contactUsService.deleteContactUs(uuid, lang);
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
