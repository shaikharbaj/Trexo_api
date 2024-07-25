/**
 * @fileoverview
 * Social media service file to handle all related functionality.
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
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { MODULE_CONFIG } from './module.config';
import { MASTER_MS_SOCIAL_MEDIA_PATTERN } from './pattern';
import {
  CreateSocialMediaBody,
  ToggleSocialMediaVisibilityBody,
  UpdateSocialMediaBody
} from './types';

@Injectable()
export class SocialMediaService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("CMS_MICROSERVICE")
    private readonly masterClient: ClientKafka | ClientProxy | any,
  ) { }

  async onModuleInit() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.masterClient.subscribeToResponseOf('fetchAllSocialMedia');
      this.masterClient.subscribeToResponseOf('findSocialMediaById');
      this.masterClient.subscribeToResponseOf('createSocialMedia');
      this.masterClient.subscribeToResponseOf('toggleSocialMediaVisibility');
      this.masterClient.subscribeToResponseOf('updateSocialMedia');
      this.masterClient.subscribeToResponseOf('deleteSocialMedia');

      this.masterClient.connect();
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.masterClient.close();
    }
  }

  /**
  * @description
  * Send message to required micro-service to fetch all the social media
  */
  async fetchAllSocialMedia(page: number, searchText: string, lang: string,) {
    try {

      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_SOCIAL_MEDIA_PATTERN[MODULE_CONFIG.transport].fetchAllSocialMedia,
          { page, searchText, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch social media by given id
   */
  async findSocialMediaById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_SOCIAL_MEDIA_PATTERN[MODULE_CONFIG.transport].findSocialMediaById,
          { uuid, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create social media
   */
  async createSocialMedia(auth: any, lang: string, data: CreateSocialMediaBody) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_SOCIAL_MEDIA_PATTERN[MODULE_CONFIG.transport].createSocialMedia,
          { auth, lang, data },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update social media visibility i.e: active, inactive
   */
  async toggleSocialMediaVisibility(
    uuid: string,
    auth: any,
    lang: string,
    payload: ToggleSocialMediaVisibilityBody,
  ) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_SOCIAL_MEDIA_PATTERN[MODULE_CONFIG.transport]
            .toggleSocialMediaVisibility,
          { uuid, auth, lang, data: payload },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update social media
   */
  async updateSocialMedia(uuid: string, auth: any, lang: string, payload: UpdateSocialMediaBody) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_SOCIAL_MEDIA_PATTERN[MODULE_CONFIG.transport].updateSocialMedia,
          { uuid, auth, lang, data: payload },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete social media
   */
  async deleteSocialMedia(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_SOCIAL_MEDIA_PATTERN[MODULE_CONFIG.transport].deleteSocialMedia,
          { uuid, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }
}
