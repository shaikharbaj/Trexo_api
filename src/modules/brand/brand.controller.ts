/**
 * @fileoverview
 * Brand controller file to handle all the brand requests.
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
import { BRAND_MODULE_PERMISSION } from './permission';
import { AuthGuard, RoleGuard, LangGuard } from '../auth/guard';
import { Auth, HasPermission, Lang } from 'src/common/decorators';
import { BrandService } from './brand.service';
import {
  CreateBrandBody,
  ToggleBrandVisibilityBody,
  UpdateBrandBody
} from './types';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }

  /**
 * @description
 * Rest API to fetch all the brand
 */
  @HasPermission(BRAND_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get()
  async fetchAllBrand(@Query() { page, searchText }: any, @Lang() lang: string,) {
    try {
      const response: any = await this.brandService.fetchAllBrand(page, searchText, lang);
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
   * Rest API to fetch all the deleted brand
   */
  @HasPermission(BRAND_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get('/deleted')
  async fetchAllDeletedBrand(@Query() { page, searchText }: any, @Lang() lang: string,) {
    try {
      const response: any = await this.brandService.fetchAllDeletedBrand(page, searchText, lang);
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
* Rest API to fetch all the brands in dropdown
*/
  @HasPermission(BRAND_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get('/dropdown')
  async fetchAllBrandForDropdown(@Lang() lang: string) {
    try {
      const response: any = await this.brandService.fetchAllBrandForDropdown(lang);
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
   * Rest API to fetch brand by given id
   */
  @HasPermission(BRAND_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get(':uuid')
  async findBrandById(@Param('uuid') uuid: string, @Lang() lang: string) {
    try {
      const response: any = await this.brandService.findBrandById(uuid, lang);
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
   * Rest API to create brand
   */
  @HasPermission(BRAND_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Post()
  async createBrand(@Auth() auth: any, @Lang() lang: string, @Body() data: CreateBrandBody) {
    try {
      const response: any = await this.brandService.createBrand(auth, lang, data);
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
   * Rest API to update brand visibility i.e: active, inactive
   */
  @HasPermission(BRAND_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch('toggle/visibility/:uuid')
  async toggleBrandVisibility(
    @Param('uuid') uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() body: ToggleBrandVisibilityBody,
  ) {
    try {
      const response: any = await this.brandService.toggleBrandVisibility(
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
   * Rest API to update brand
   */
  @HasPermission(BRAND_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch(':uuid')
  async updateBrand(
    @Param('uuid') uuid: string,
    @Auth() auth: any,
    @Lang() lang: string,
    @Body() data: UpdateBrandBody,
  ) {
    try {
      const response: any = await this.brandService.updateBrand(
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
   * Rest API to Restore deleted brand
   */
  @HasPermission(BRAND_MODULE_PERMISSION.RESTORE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch('/restore/:uuid')
  async restoreBrand(@Param('uuid') uuid: string, @Auth() auth: any, @Lang() lang: string) {
    try {
      const response: any = await this.brandService.restoreBrand(uuid, auth, lang);
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
   * Rest API to delete brand
   */
  @HasPermission(BRAND_MODULE_PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Delete(':uuid')
  async deleteBrand(@Param('uuid') uuid: string, @Auth() auth: any, @Lang() lang: string) {
    try {
      const response: any = await this.brandService.deleteBrand(uuid, auth, lang);
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
