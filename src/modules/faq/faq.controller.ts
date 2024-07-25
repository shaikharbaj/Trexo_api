/**
 * @fileoverview
 * Faq controller file to handle all the faq requests.
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
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, LangGuard, RoleGuard } from '../auth/guard';
import { Auth, HasPermission, Lang } from 'src/common/decorators';
import { FAQ_MODULE_PERMISSION } from './permission';
import { FaqService } from './faq.service';
import { CreateFaqBody, toggleFaqBody, UpdateFaqBody } from './type';


@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) { }

  /**
   * @description
   * Rest API to fetch all the faq
   */
  @HasPermission(FAQ_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get()
  async fetchAllFaq(@Query() { page, searchText }: any, @Lang() lang: string) {
    try {
      const response: any = await this.faqService.fetchAllFaq(
        page,
        searchText,
        lang
      );
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
   * Rest API to fetch all the deleted faq
   */
  @HasPermission(FAQ_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get('/deleted')
  async fetchAllDeletedFaq(@Query() { page, searchText }: any, @Lang() lang: string) {
    try {
      const response: any = await this.faqService.fetchAllDeletedFaq(
        page,
        searchText,
        lang
      );
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
  * Rest API to fetch faq by given id
  */
  @HasPermission(FAQ_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get(':uuid')
  async findFaqById(@Param('uuid') uuid: string, @Lang() lang: string) {
    try {
      const response: any = await this.faqService.findFaqById(uuid, lang);
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
   * Rest API to create faq
   */
  @HasPermission(FAQ_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Post()
  async createFaq(@Auth() auth: any, @Body() data: CreateFaqBody, @Lang() lang: string) {
    try {
      const response: any = await this.faqService.createFaq(auth, data, lang);
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
   * Rest API to update faq visibility i.e: active, inactive
   */
  @HasPermission(FAQ_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch('toggle/visibility/:uuid')
  async toggleFaqVisibility(
    @Param('uuid') uuid: string,
    @Auth() auth: any,
    @Body() body: toggleFaqBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.faqService.toggleFaqVisibility(
        uuid,
        auth,
        body,
        lang
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
   * Rest API to update faq
   */
  @HasPermission(FAQ_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch(':uuid')
  async updateFaq(
    @Auth() auth: any,
    @Body() data: UpdateFaqBody,
    @Param('uuid') uuid: string, @Lang() lang: string
  ) {
    try {
      const response: any = await this.faqService.updateFaq(
        uuid,
        auth,
        data,
        lang
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
   * Rest API to Restore deleted faq
   */
  @HasPermission(FAQ_MODULE_PERMISSION.RESTORE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch('/restore/:uuid')
  async restoreFaq(@Param('uuid') uuid: string, @Auth() auth: any, @Lang() lang: string) {
    try {
      const response: any = await this.faqService.restoreFaq(
        uuid,
        auth,
        lang
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
   * Rest API to delete faq
   */
  @HasPermission(FAQ_MODULE_PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Delete(':uuid')
  async deleteFaq(@Param('uuid') uuid: string, @Auth() auth: any, @Lang() lang: string) {
    try {
      const response: any = await this.faqService.deleteFaq(uuid, auth, lang);
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