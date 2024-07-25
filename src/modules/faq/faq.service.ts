/**
 * @fileoverview
 * Faq service file to handle all related functionality.
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
import { CMS_MS_FAQ_PATTERN } from './pattern';
import { CreateFaqBody, toggleFaqBody, UpdateFaqBody } from './type';

@Injectable()
export class FaqService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('CMS_MICROSERVICE')
    private readonly cmsClient: ClientKafka | ClientProxy | any,
  ) { }

  async onModuleInit() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      if (MODULE_CONFIG.transport === 'KAFKA') {
        this.cmsClient.subscribeToResponseOf('fetchAllFaq');
        this.cmsClient.subscribeToResponseOf('fetchAllDeletedFaq');
        this.cmsClient.subscribeToResponseOf('findFaqById');
        this.cmsClient.subscribeToResponseOf('createFaq');
        this.cmsClient.subscribeToResponseOf('updateFaq');
        this.cmsClient.subscribeToResponseOf('deleteFaq');
        this.cmsClient.subscribeToResponseOf('toggleFaqVisibility');
        this.cmsClient.subscribeToResponseOf('restoreFaq');

        this.cmsClient.connect();
      }
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.cmsClient.close();
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the faq
   */
  async fetchAllFaq(page: number, searchText: string, lang: string) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_FAQ_PATTERN[MODULE_CONFIG.transport].fetchAllFaq,
          { page, searchText, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
 * @description
 * Send message to required micro-service to fetch all the deleted faq
 */
  async fetchAllDeletedFaq(page: number, searchText: string, lang: string) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_FAQ_PATTERN[MODULE_CONFIG.transport]
            .fetchAllDeletedFaq,
          { page, searchText, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
* @description
* Send message to required micro-service to fetch faq by given id
*/
  async findFaqById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_FAQ_PATTERN[MODULE_CONFIG.transport].findFaqById,
          { uuid, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
 * @description
 * Send message to required micro-service to create faq
 */
  async createFaq(auth: any, data: CreateFaqBody, lang: string) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_FAQ_PATTERN[MODULE_CONFIG.transport].createFaq,
          { auth, data, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
* @description
* Send message to required micro-service to update faq visibility i.e: active, inactive
*/
  async toggleFaqVisibility(
    uuid: string,
    auth: any,
    payload: toggleFaqBody, lang: string
  ) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_FAQ_PATTERN[MODULE_CONFIG.transport]
            .toggleFaqVisibility,
          { uuid: uuid, auth, data: payload, lang: lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
 * @description
 * Send message to required micro-service to update faq
 */
  async updateFaq(uuid: string, auth: any, payload: UpdateFaqBody, lang: string) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_FAQ_PATTERN[MODULE_CONFIG.transport].updateFaq,
          { uuid: uuid, auth, data: payload, lang: lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
* @description
* Send message to required micro-service to delete faq
*/
  async deleteFaq(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_FAQ_PATTERN[MODULE_CONFIG.transport].deleteFaq,
          { uuid: uuid, auth, lang: lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
 * @description
 * Send message to required micro-service to restore deleted faq
 */
  async restoreFaq(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_FAQ_PATTERN[MODULE_CONFIG.transport].restoreFaq,
          { uuid: uuid, auth, lang: lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }
}