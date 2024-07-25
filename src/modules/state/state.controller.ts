/**
 * @fileoverview
 * State controller file to handle all the state requests.
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
import { StateService } from "./state.service";
import { Auth, HasPermission, Lang } from "src/common/decorators";
import { LangGuard, RoleGuard,AuthGuard } from "../auth/guard";
import { STATE_MODULE_PERMISSION } from "./permission";
import {
  CreateStateBody,
  UpdateStateBody,
  toggleStateVisibilityBody,
} from "./types";

@Controller("/state")
export class StateController {
  constructor(private readonly stateService: StateService) {}

  /**
   * @description
   * Rest API to fetch all the states
   */
  @HasPermission(STATE_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get()
  async fetchAllState(
    @Query() { page, searchText }: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.stateService.fetchAllState(
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
   * Rest API to fetch all the states for dropdown
   */
  @HasPermission(STATE_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get("/dropdown")
  async fetchAllStateForDropdown(@Query() { uuid }: any, @Lang() lang: string) {
    try {
      const response: any = await this.stateService.fetchAllStateForDropdown(
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
   * Rest API to fetch all deleted states.
   */
  @HasPermission(STATE_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get("/deleted")
  async fetchAllDeletedState(
    @Query() { page, searchText }: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.stateService.fetchAllDeletedState(
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
   * Rest API to fetch state by given id
   */
  @HasPermission(STATE_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get(":uuid")
  async findStateById(@Param("uuid") uuid: string, @Lang() lang: string) {
    try {
      const response: any = await this.stateService.findStateById(uuid, lang);
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
   * Rest API to create state
   */
  @HasPermission(STATE_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Post()
  async createState(
    @Auth() auth: any,
    @Body() data: CreateStateBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.stateService.createState(
        auth,
        data,
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
   * Rest API to update state
   */
  @HasPermission(STATE_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch(":uuid")
  async updateState(
    @Auth() auth: any,
    @Body() data: UpdateStateBody,
    @Param("uuid") uuid: string,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.stateService.updateState(
        uuid,
        auth,
        data,
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
   * Rest API to delete state
   */
  @HasPermission(STATE_MODULE_PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Delete(":uuid")
  async deleteState(
    @Auth() auth: any,
    @Param("uuid") uuid: string,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.stateService.deleteState(
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
   * Rest API to restore the deleted state.
   */
    @HasPermission(STATE_MODULE_PERMISSION.RESTORE)
    @UseGuards(AuthGuard, RoleGuard, LangGuard)
    @Patch("/restore/:uuid")
    async restoreDeletedState(
      @Auth() auth: any,
      @Param("uuid") uuid: string,
      @Lang() lang: string
    ) {
      try {
        const response: any = await this.stateService.restoreDeletedState(
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
   * Rest API to update state visibility i.e: active, inactive
   */
  @HasPermission(STATE_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch("toggle/visibility/:uuid")
  async toggleStateVisibility(
    @Auth() auth: any,
    @Param("uuid") uuid: string,
    @Body() body: toggleStateVisibilityBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.stateService.toggleStateVisibility(
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
