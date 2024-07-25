/**
 * @fileoverview
 * Tax controller file to handle all the Tax requests.
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
  UseInterceptors,
} from '@nestjs/common';
import { Auth, HasPermission, Lang } from 'src/common/decorators';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { TaxService } from './tax.service';
import { TAX_MODULE_PERMISSION } from './permission';

import { CreateTaxBody, ToggleTaxVisibilityBody, UpdateTaxBody } from './types';
import { LangGuard } from '../auth/guard';

@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) { }

  /**
   * @description
   * Rest API to fetch all the tax
   */
  @HasPermission(TAX_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get()
  async fetchAllTax(@Query() { page, searchText }: any, @Lang() lang: string) {
    try {
      const response: any = await this.taxService.fetchAllTax(page, searchText, lang);
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
 * Rest API to fetch all the deleted tax
 */
  @HasPermission(TAX_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get('/deleted')
  async fetchAllDeletedTax(@Query() { page, searchText }: any, @Lang() lang: string) {
    try {
      const response: any = await this.taxService.fetchAllDeletedTax(
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
   * Rest API to fetch tax by given id
   */
  @HasPermission(TAX_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get(':uuid')
  async findTaxById(@Param('uuid') uuid: string, @Lang() lang: string) {
    try {
      const response: any = await this.taxService.findTaxById(uuid, lang);
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
   * Rest API to create tax
   */
  @HasPermission(TAX_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Post()
  async createTax(@Auth() auth: any, @Body() tax: CreateTaxBody, @Lang() lang: string) {
    try {
      const response: any = await this.taxService.createTax(auth, tax, lang);
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
   * Rest API to update tax
   */
  @HasPermission(TAX_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch(':uuid')
  async updateTax(
    @Param('uuid') uuid: string,
    @Body() tax: UpdateTaxBody,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.taxService.updateTax(uuid, tax, auth, lang);
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
   * Rest API to delete tax
   */
  @HasPermission(TAX_MODULE_PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Delete(':uuid')
  async deleteTax(@Param('uuid') uuid: string, @Auth() auth: any, @Lang() lang: string) {
    try {
      const response: any = await this.taxService.deleteTax(uuid, auth, lang);
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
   * Rest API to update tax visibility i.e: active, inactive
   */
  @HasPermission(TAX_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch('toggle/visibility/:uuid')
  async toggleTaxVisibility(
    @Param('uuid') uuid: string,
    @Body() body: ToggleTaxVisibilityBody,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.taxService.toggleTaxVisibility(uuid, body, auth, lang);
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
   * Rest API to import tax file
   */
  @HasPermission(TAX_MODULE_PERMISSION.IMPORT)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Post('import')
  async importTax(
    @Auth() auth: any, @Lang() lang: string
  ) {
    try {
      const response: any = await this.taxService.importTax(auth, '', lang);
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
 * Rest API to Restore deleted tax
 */
  @HasPermission(TAX_MODULE_PERMISSION.RESTORE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch('/restore/:uuid')
  async restoreTax(@Param('uuid') uuid: string, @Auth() auth: any, @Lang() lang: string) {
    try {
      const response: any = await this.taxService.restoreTax(
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
}
