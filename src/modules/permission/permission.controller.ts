import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Auth } from 'src/common/decorators/auth.decorator';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  async fetchAllPermissions() {
    try {
      const response:any = await this.permissionService.fetchAllPermissions();
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

  @Get(':id')
  async findPermissionsById(@Param('id') id: string) {
    try {
      const response:any = await this.permissionService.findPermissionsById(+id);
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

  @Post()
  async createPermissions(@Auth() auth: any, @Body() body: any) {
    try {
      const response:any = await this.permissionService.createPermissions(auth, body);
      return {
        statusCode: HttpStatus.CREATED,
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

  @Patch(':id')
  async updatePermissions(@Param('id') id: string, @Body() body: any, @Auth() auth: any) {
    try {
      const response:any = await this.permissionService.updatePermissions(+id, body, auth);
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

  @Delete(':id')
  async deletePermissions(@Param('id') id: string, @Auth() auth: any) {
    try {
      const response:any = await this.permissionService.deletePermissions(+id, auth);
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
}
