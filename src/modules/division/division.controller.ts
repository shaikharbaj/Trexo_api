/**
 * @fileoverview
 * Division controller file to handle all the division requests.
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
import { DIVISION_MODULE_PERMISSION } from './permission';
import { AuthGuard, LangGuard, RoleGuard } from '../auth/guard';
import { Auth, HasPermission, Lang } from 'src/common/decorators';
import { DivisionService } from './division.service';
import {
  CreateDivisionBody,
  ToggleDivisionVisibilityBody,
  UpdateDivisionBody
} from './types';

@Controller('division')
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) { }

  /**
 * @description
 * Rest API to fetch all the division
 */
  @HasPermission(DIVISION_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get()
  async fetchAllDivision(@Query() { page, searchText }: any, @Lang() lang: string) {
    try {
      const response: any = await this.divisionService.fetchAllDivision(page, searchText, lang);
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
   * Rest API to fetch all the deleted division
   */
  @HasPermission(DIVISION_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get('/deleted')
  async fetchAllDeletedDivision(@Query() { page, searchText }: any, @Lang() lang: string) {
    try {
      const response: any = await this.divisionService.fetchAllDeletedDivision(page, searchText, lang);
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
* Rest API to fetch all the divisions in dropdown
*/
  @HasPermission(DIVISION_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get('/dropdown')
  async fetchAllDivisionForDropdown(@Lang() lang: string) {
    try {
      const response: any = await this.divisionService.fetchAllDivisionForDropdown(lang);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response?.data,
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
   * Rest API to fetch division by given id
   */
  @HasPermission(DIVISION_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get(':uuid')
  async findDivisionById(@Param('uuid') uuid: string, @Lang() lang: string) {
    try {
      const response: any = await this.divisionService.findDivisionById(uuid, lang);
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
   * Rest API to create division
   */
  @HasPermission(DIVISION_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Post()
  async createDivision(@Auth() auth: any, @Lang() lang: string, @Body() data: CreateDivisionBody) {
    try {
      const response: any = await this.divisionService.createDivision(auth, lang, data);
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
   * Rest API to update division visibility i.e: active, inactive
   */
  @HasPermission(DIVISION_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch('toggle/visibility/:uuid')
  async toggleDivisionVisibility(
    @Param('uuid') uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() body: ToggleDivisionVisibilityBody,
  ) {
    try {
      const response: any = await this.divisionService.toggleDivisionVisibility(
        uuid,
        auth,
        lang,
        body,
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
   * Rest API to update division
   */
  @HasPermission(DIVISION_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch(':uuid')
  async updateDivision(
    @Param('uuid') uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() data: UpdateDivisionBody,

  ) {
    try {
      const response: any = await this.divisionService.updateDivision(
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
   * Rest API to Restore deleted division
   */
  @HasPermission(DIVISION_MODULE_PERMISSION.RESTORE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch('/restore/:uuid')
  async restoreDivision(@Param('uuid') uuid: string, @Auth() auth: any, @Lang() lang: string) {
    try {
      const response: any = await this.divisionService.restoreDivision(uuid, auth, lang);
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
   * Rest API to delete division
   */
  @HasPermission(DIVISION_MODULE_PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Delete(':uuid')
  async deleteDivision(@Param('uuid') uuid: string, @Auth() auth: any, @Lang() lang: string) {
    try {
      const response: any = await this.divisionService.deleteDivision(uuid, auth, lang);
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
