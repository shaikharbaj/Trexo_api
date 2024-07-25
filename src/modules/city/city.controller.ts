/**
 * @fileoverview
 * city controller file to handle all the city requests.
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
} from "@nestjs/common";
import { CityService } from "./city.service";
import { Auth, HasPermission, Lang } from "src/common/decorators";
import { LangGuard, RoleGuard, AuthGuard } from "../auth/guard";
import { CITY_MODULE_PERMISSION } from "./permission";
import {
  CreateCityBody,
  UpdateCityBody,
  ToggleCityVisibilityBody,
} from "./types";

@Controller("city")
export class CityController {
  constructor(private readonly cityService: CityService) {}

  /**
   * @description
   * Rest API to fetch all the cities
   */
  @HasPermission(CITY_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get()
  async fetchAllCity(@Query() { page, searchText }: any, @Lang() lang: string) {
    try {
      const response: any = await this.cityService.fetchAllCity(
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
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to fetch all the cities for dropdown
   */
  @HasPermission(CITY_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get("/dropdown")
  async fetchAllCityForForDropdown(
    @Query() { uuid }: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.cityService.fetchAllCityForForDropdown(
        uuid,
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
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to fetch all the deleted cities..
   */
  @HasPermission(CITY_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get("/deleted")
  async fetchAllDeletedCity(
    @Query() { page, searchText }: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.cityService.fetchAllDeletedCity(
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
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to fetch city by given id
   */
  @HasPermission(CITY_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get(":uuid")
  async findCityById(@Param("uuid") uuid: string, @Lang() lang: string) {
    try {
      const response: any = await this.cityService.findCityById(uuid, lang);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response.data,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to create city
   */
  @HasPermission(CITY_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Post()
  async createCity(
    @Auth() auth: any,
    @Body() data: CreateCityBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.cityService.createCity(auth, data, lang);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response.data,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to update city
   */
  @HasPermission(CITY_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch(":uuid")
  async updateCity(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Body() body: UpdateCityBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.cityService.updateCity(
        uuid,
        auth,
        body,
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
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to delete city
   */
  @HasPermission(CITY_MODULE_PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Delete(":uuid")
  async deleteCity(
    @Auth() auth: any,
    @Param("uuid") uuid: string,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.cityService.deleteCity(uuid, auth, lang);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response.data,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to restore deleted city
   */
  @HasPermission(CITY_MODULE_PERMISSION.RESTORE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch("/restore/:uuid")
  async restoreDeletedCity(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.cityService.restoreDeletedCity(
        uuid,
        auth,
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
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to update city visibility i.e: active, inactive
   */
  @HasPermission(CITY_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch("toggle/visibility/:uuid")
  async toggleCityVisibility(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Body() body: ToggleCityVisibilityBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.cityService.toggleCityVisibility(
        uuid,
        auth,
        body,
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
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
