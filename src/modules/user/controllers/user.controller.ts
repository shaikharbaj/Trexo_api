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
import { UserService } from "../services";
import { BuyerLoginBody, RegisterBuyerBody } from "../types";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * @description
   * Rest API to create a new buyer.
   */
  @Post("buyer/register")
  async registerBuyer(@Body() body: RegisterBuyerBody) {
    try {
      const response: any = await this.userService.registerBuyer(body);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
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
   * Rest API to login a buyer .
   */
  @Post("buyer/login")
  async loginBuyer(@Body() body: BuyerLoginBody) {
    try {
      const response: any = await this.userService.loginBuyer(body);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
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
   * Rest API to send buyer OTP.
   */
  @Post("buyer/send-otp")
  async sendBuyerRegisterOTP(@Body() body: any) {
    try {
      const response: any = await this.userService.sendBuyerRegisterOTP(body);
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
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
   * Rest API to send buyer OTP.
   */
   @Post("buyer/verify-otp")
   async verifyBuyerRegisterOTP(@Body() body: any) {
     try {
       const response: any = await this.userService.verifyBuyerRegisterOTP(body);
       return {
         statusCode: HttpStatus.OK,
         status: response?.status,
         message: response?.message,
       };
     } catch (err) {
       throw new HttpException(
         err.message,
         err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
       );
     }
   }
}
