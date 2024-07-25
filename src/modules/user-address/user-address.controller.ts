/**
 * @fileoverview
 * User Address controller file to handle all the Address requests.
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
import { USER_ADDRESS_MODULE_PERMISSION } from './permission';
import { UserAddressService } from './user-address.service';
import { LangGuard } from '../auth/guard';

@Controller('user-address')
export class UserAddressController {
    constructor(private readonly userAddressService: UserAddressService) { }

    /**
     * @description
     * Rest API to fetch all the user address
     */
    @HasPermission(USER_ADDRESS_MODULE_PERMISSION.LIST)
    @UseGuards(AuthGuard, RoleGuard, LangGuard)
    @Get()
    async fetchAllAddress(@Query() { page, searchText }: any, @Lang() lang: string) {
        try {
            const response: any = await this.userAddressService.fetchAllAddress(page, searchText, lang);
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
 * Rest API to fetch all the deleted addresss
 */
    @HasPermission(USER_ADDRESS_MODULE_PERMISSION.LIST)
    @UseGuards(AuthGuard, RoleGuard, LangGuard)
    @Get('/deleted')
    async fetchAllAddressDeleted(@Query() { page, searchText }: any, @Lang() lang: string) {
        try {
            const response: any = await this.userAddressService.fetchAllAddressDeleted(
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
     * Rest API to fetch address by given id
     */
    @HasPermission(USER_ADDRESS_MODULE_PERMISSION.LIST)
    @UseGuards(AuthGuard, RoleGuard, LangGuard)
    @Get(':uuid')
    async findAddressById(@Param('uuid') uuid: string, @Lang() lang: string) {
        try {
            const response: any = await this.userAddressService.findAddressById(uuid, lang);
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
     * Rest API to create address
     */
    @HasPermission(USER_ADDRESS_MODULE_PERMISSION.ADD)
    @UseGuards(AuthGuard, RoleGuard, LangGuard)
    @Post()
    async createAddress(@Auth() auth: any, @Body() body: any, @Lang() lang: string) {
        try {
            const response: any = await this.userAddressService.createAddress(auth, body, lang);
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
     * Rest API to update address
     */
    @HasPermission(USER_ADDRESS_MODULE_PERMISSION.UPDATE)
    @UseGuards(AuthGuard, RoleGuard, LangGuard)
    @Patch(':uuid')
    async updateAddress(
        @Param('uuid') uuid: string,
        @Body() body: any,
        @Auth() auth: any,
        @Lang() lang: string
    ) {
        try {
            const response: any = await this.userAddressService.updateAddress(uuid, body, auth, lang);
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
     * Rest API to delete address
     */
    @HasPermission(USER_ADDRESS_MODULE_PERMISSION.DELETE)
    @UseGuards(AuthGuard, RoleGuard, LangGuard)
    @Delete(':uuid')
    async deleteAddress(@Param('uuid') uuid: string, @Auth() auth: any, @Lang() lang: string) {
        try {
            const response: any = await this.userAddressService.deleteAddress(uuid, auth, lang);
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
     * Rest API to update address visibility i.e: active, inactive
     */
    @HasPermission(USER_ADDRESS_MODULE_PERMISSION.UPDATE)
    @UseGuards(AuthGuard, RoleGuard, LangGuard)
    @Patch('toggle/default/:uuid')
    async toggleAddressDefault(
        @Param('uuid') uuid: string,
        @Body() body: any,
        @Auth() auth: any,
        @Lang() lang: string
    ) {
        try {
            const response: any = await this.userAddressService.toggleAddressDefault(uuid, body, auth, lang);
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
 * Rest API to Restore deleted address
 */
    @HasPermission(USER_ADDRESS_MODULE_PERMISSION.RESTORE)
    @UseGuards(AuthGuard, RoleGuard, LangGuard)
    @Patch('/restore/:uuid')
    async restoreAddressById(@Param('uuid') uuid: string, @Auth() auth: any, @Lang() lang: string) {
        try {
            const response: any = await this.userAddressService.restoreAddressById(uuid, auth, lang);
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
