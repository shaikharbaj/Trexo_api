/**
 * @fileoverview
 * notification controller file to handle all the settings requests.
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
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { NotificationService } from './notification.service';
import { Auth } from 'src/common/decorators';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  /**
   * @description
   * Rest API to register notification token
   */
  @UseGuards(AuthGuard)
  @Post('register-token')
  async registerNotificationToken(@Auth() auth: any, @Body() body: any) {
    try {
      const response: any = await this.notificationService.registerNotificationToken(auth, body);
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
   * Rest API to send push notification
   */
  @UseGuards(AuthGuard)
  @Post('send-push')
  async sendPushNotification(@Auth() auth: any, @Body() body: any) {
    try {
      const response: any = await this.notificationService.sendPushNotification(auth, body);
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
   * Rest API to fetch user notification preference
   */
  @UseGuards(AuthGuard)
  @Get('fetch-user-preference')
  async fetchUserNotificationPreference(@Auth() auth: any) {
    try {
      const response: any = await this.notificationService.fetchUserNotificationPreference(auth);
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
   * Rest API to set user notification preference
   */
  @UseGuards(AuthGuard)
  @Post('set-user-preference')
  async setUserNotificationPreference(@Auth() auth: any, @Body() body: any) {
    try {
      const response: any = await this.notificationService.setUserNotificationPreference(auth, body);
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
   * Rest API to fetch user notification preference
   */
  @UseGuards(AuthGuard)
  @Get('event')
  async fetchNotificationEvent(@Auth() auth: any) {
    try {
      const response: any = await this.notificationService.fetchNotificationEvent(auth);
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
   * Rest API to send notification
   */
  @UseGuards(AuthGuard)
  @Post('test')
  async testNotification(@Body() body: any) {
    try {
      console.log('in controller');
      
      const response: any = await this.notificationService.testNotification(body);
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
   * Rest API to send email 
   */
  @UseGuards(AuthGuard)
  @Post('test-email-template')
  async sendTestEmailTemplate(@Body() body: any) {
    try {
      const response: any = await this.notificationService.sendTestEmailTemplate(body);
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
