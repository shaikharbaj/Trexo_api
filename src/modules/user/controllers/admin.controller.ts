import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  HttpCode,
  Res,
  HttpStatus,
  HttpException,
  UseGuards,
  Query,
  Delete,
} from '@nestjs/common';
import { Auth, HasPermission } from 'src/common/decorators';
import { AuthGuard, RoleGuard } from 'src/modules/auth/guard';
import { ADMIN_MODULE_PERMISSION } from '../permission';
import { AdminService } from '../services';
import { CreateAdminUserBody, ToggleAdminUserVisibilityBody, UpdateAdminUserBody } from '../types';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * @description
   * Rest API to fetch all the admin user
   */
  @HasPermission(ADMIN_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  async fetchAllAdminUser(@Query() { page, searchText }: any) {
    try {
      const response: any = await this.adminService.fetchAllAdminUser(page, searchText);
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
   * Rest API to fetch all the deleted admin users
   */
  @HasPermission(ADMIN_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard)
  @Get('/deleted')
  async fetchAllDeletedAdminUser(@Query() { page, searchText }: any) {
    try {
      const response: any = await this.adminService.fetchAllDeletedAdminUser(
        page,
        searchText,
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
   * Rest API to fetch all the admin user in dropdown
   */
  @UseGuards(AuthGuard)
  @Get('/dropdown')
  async fetchAllAdminUserForDropdown() {
    try {
      const response: any =
        await this.adminService.fetchAllAdminUserForDropdown();
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
   * Rest API to fetch admin user by given uuid
   */
  @HasPermission(ADMIN_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard)
  @Get(':uuid')
  async findAdminUserById(@Param('uuid') uuid: string) {
    try {
      const response: any = await this.adminService.findAdminUserById(uuid);
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
   * Rest API to create a new admin user
   */
  @HasPermission(ADMIN_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  async createAdminUser(@Auth() auth: any, @Body() body: CreateAdminUserBody) {
    try {
      const response: any = await this.adminService.createAdminUser(auth, body);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message
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
   * Rest API to update admin user visibility i.e: active, inactive
   */
  @HasPermission(ADMIN_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch('toggle/visibility/:uuid')
  async toggleAdminUserVisibility(
    @Param('uuid') uuid: string,
    @Auth() auth: any,
    @Body() body: ToggleAdminUserVisibilityBody,
  ) {
    try {
      const response: any = await this.adminService.toggleAdminUserVisibility(
        uuid,
        auth,
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
   * Rest API to update admin user
   */
  @HasPermission(ADMIN_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':uuid')
  async updateAdminUser(
    @Param('uuid') uuid: string,
    @Auth() auth: any,
    @Body() data: UpdateAdminUserBody,
  ) {
    try {
      const response: any = await this.adminService.updateAdminUser(
        uuid,
        auth,
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
   * Rest API to delete country
   */
  @HasPermission(ADMIN_MODULE_PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':uuid')
  async deleteAdminUser(@Param('uuid') uuid: string, @Auth() auth: any) {
    try {
      const response: any = await this.adminService.deleteAdminUser(uuid, auth);
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
   * Rest API to Restore deleted admin user
   */
  @HasPermission(ADMIN_MODULE_PERMISSION.RESTORE)
  @UseGuards(AuthGuard, RoleGuard)
  @Get('/restore/:uuid')
  async restoreAdminUser(@Param('uuid') uuid: string, @Auth() auth: any) {
    try {
      const response: any = await this.adminService.restoreAdminUser(uuid, auth);
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
