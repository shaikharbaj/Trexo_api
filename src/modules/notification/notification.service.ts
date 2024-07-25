/**
 * @fileoverview
 * tracking hook service file to handle all Preferences logic functionality.
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
import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { MODULE_CONFIG } from './module.config';
import { NOTIFICATION_MS_PATTERN } from './pattern';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class NotificationService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('NOTIFICATION_MICROSERVICE')
    private readonly notificationMicroService: ClientProxy | ClientKafka | any,
  ) { }

  async onModuleInit() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.notificationMicroService.subscribeToResponseOf('registerNotificationToken');
      this.notificationMicroService.subscribeToResponseOf('sendPushNotification');
      this.notificationMicroService.subscribeToResponseOf('fetchUserNotificationPreference');
      this.notificationMicroService.subscribeToResponseOf('setUserNotificationPreference');
      this.notificationMicroService.subscribeToResponseOf('fetchNotificationEvent');
      this.notificationMicroService.subscribeToResponseOf('sendUserNotificationTest');
      this.notificationMicroService.subscribeToResponseOf('sendEmailTemplate');
      this.notificationMicroService.connect();
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.notificationMicroService.close();
    }
  }

  /**
   * @description
   * Send message to required micro-service to register notification table
   */
  async registerNotificationToken(auth: any, data: any) {
    try {
      return await lastValueFrom(this.notificationMicroService.send(
        NOTIFICATION_MS_PATTERN[MODULE_CONFIG.transport].registerNotificationToken,
        { auth, data },
      ));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to send push notification
   */
  async sendPushNotification(auth: any, data: any) {
    try {
      return await lastValueFrom(this.notificationMicroService.send(
        NOTIFICATION_MS_PATTERN[MODULE_CONFIG.transport].sendPushNotification,
        { auth, data },
      ));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch user notification preference
   */
  async fetchUserNotificationPreference(auth: any) {
    try {
      return await lastValueFrom(this.notificationMicroService.send(
        NOTIFICATION_MS_PATTERN[MODULE_CONFIG.transport].fetchUserNotificationPreference,
        { auth },
      ));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to set user notification preference
   */
  async setUserNotificationPreference(auth: any, data: any) {
    try {
      return await lastValueFrom(this.notificationMicroService.send(
        NOTIFICATION_MS_PATTERN[MODULE_CONFIG.transport].setUserNotificationPreference,
        { auth, data },
      ));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch notification event list
   */
  async fetchNotificationEvent(auth: any) {
    try {
      return await lastValueFrom(this.notificationMicroService.send(
        NOTIFICATION_MS_PATTERN[MODULE_CONFIG.transport].fetchNotificationEvent,
        { auth },
      ));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to send notification
   */
  async testNotification(data: any) {
    try {
      console.log('in service');
      
      return await lastValueFrom(this.notificationMicroService.send(
        NOTIFICATION_MS_PATTERN[MODULE_CONFIG.transport].sendUserNotificationTest,
        { data },
      ));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to send notification
   */
  async sendTestEmailTemplate(data: any) {
    try {
      return await lastValueFrom(this.notificationMicroService.send(
        NOTIFICATION_MS_PATTERN[MODULE_CONFIG.transport].sendEmailTemplate,
        { data },
      ));
    } catch (error) {
      throw error;
    }
  }
}
