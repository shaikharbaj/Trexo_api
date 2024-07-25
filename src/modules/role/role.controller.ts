/**
 * @fileoverview
 * Role controller file to handle all the roles requests.
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
import { AuthGuard } from '../auth/guard/auth.guard';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CreateRoleBody } from './types';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /**
   * @description
   * Rest API to fetch all the roles
   */
  @UseGuards(AuthGuard)
  @Get()
  async fetchAllRole(@Query() { page, searchText }: any) {
    try {
      const response: any = await this.roleService.fetchAllRole(
        page,
        searchText,
      );
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
   * Rest API to fetch deleted roles
   */
  @UseGuards(AuthGuard)
  @Get('deleted')
  async fetchAllRolesDeleted(@Query() { page, searchText }: any) {
    try {
      const response: any = await this.roleService.fetchAllRolesDeleted(
        page,
        searchText,
      );
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
   * Rest API to fetch all the roles in dropdown
   */
  @UseGuards(AuthGuard)
  @Get('/dropdown')
  async fetchAllRoleForDropdown() {
    try {
      const response: any = await this.roleService.fetchAllRoleForDropdown();
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
   * Rest API to fetch roles Meta Obj
   */
  @UseGuards(AuthGuard)
  @Get('meta')
  async fetchAllRolesMeta() {
    try {
      const response: any = await this.roleService.fetchAllRolesMeta();
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
   * Rest API to fetch permissions of requested roles
   */
  @UseGuards(AuthGuard)
  @Get('/permissions')
  async fetchRolesPermissions(@Query() { role_id }: any) {
    try {
      const response: any =
        await this.roleService.fetchRolesPermissions(role_id);
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
   * Rest API to fetch role by given id
   */
  @UseGuards(AuthGuard)
  @Get(':id')
  async findRoleById(@Param('id') id: string) {
    try {
      const response: any = await this.roleService.findRoleById(+id);
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
   * Rest API to create role
   */
  @UseGuards(AuthGuard)
  @Post()
  async createRole(@Auth() auth: any, @Body() body: CreateRoleBody) {
    try {
      const response: any = await this.roleService.createRole(auth, body);
      return {
        statusCode: HttpStatus.CREATED,
        status: response?.status,
        message: response?.message,
        data: response?.data,
      };
    } catch (err) {
      if (err?.message) {
        throw new HttpException(
          err.message,
          err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @description
   * Rest API to update role visibility i.e: active, inactive
   */
  @UseGuards(AuthGuard)
  @Patch('toggle/visibility/:id')
  async toggleRoleVisibility(
    @Param('id') id: string,
    @Body() body: any,
    @Auth() auth: any,
  ) {
    try {
      const response: any = await this.roleService.toggleRoleVisibility(
        +id,
        body,
        auth,
      );
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
   * Rest API to update role
   */
  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateRole(
    @Param('id') id: string,
    @Auth() auth: any,
    @Body() body: any,
  ) {
    try {
      const response: any = await this.roleService.updateRole(+id, auth, body);
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
   * Rest API to delete role
   */
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteRole(@Param('id') id: string, @Auth() auth: any) {
    try {
      const response: any = await this.roleService.deleteRole(+id, auth);
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
   * Rest API to restore role by given id
   */
  @UseGuards(AuthGuard)
  @Patch('restore/:id')
  async restoreRoleById(@Param('id') id: string) {
    try {
      const response: any = await this.roleService.restoreRoleById(+id);
      return {
        statusCode: HttpStatus.CREATED,
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
   * Rest API to attach permissions
   */
  @UseGuards(AuthGuard)
  @Post('attach/permissions')
  async attachPermissionsToRole(@Auth() auth: any, @Body() body: any) {
    try {
      const response: any = await this.roleService.attachPermissionsToRole(
        auth,
        body,
      );
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
}
