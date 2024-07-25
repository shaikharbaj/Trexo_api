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
} from "@nestjs/common";
import { AdminLoginBody, BuyerLoginBody } from "./types";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @description
   * Rest API to authenticate admin
   */
  @Post("admin/login")
  async adminLogin(@Body() body: AdminLoginBody) {
    try {
      const response: any = await this.authService.adminLogin(body);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response.data,
      };
    } catch (err) {
      if (err?.message) {
        throw new HttpException(
          err.message,
          err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @description
   * Rest API to authenticate Buyer
   */
  @Post("user/buyer-login")
  async buyerLogin(@Body() body: BuyerLoginBody) {
    try {
      const response: any = await this.authService.buyerLogin(body);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response.data,
      };
    } catch (err) {
      if (err?.message) {
        throw new HttpException(
          err.message,
          err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
