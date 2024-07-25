/**
 * @fileoverview
 * Contact us service file to handle all related functionality.
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
import { MASTER_MS_CONTACT_US_PATTERN } from './pattern';
import {
  CreateContactUsBody,
} from './types';

@Injectable()
export class ContactUsService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('MASTER_MICROSERVICE')
    private readonly masterClient: ClientKafka | ClientProxy | any,
  ) { }

  async onModuleInit() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.masterClient.subscribeToResponseOf('findContactUsById');
      this.masterClient.subscribeToResponseOf('fetchAllContactUs');
      this.masterClient.subscribeToResponseOf('createContactUs');
      this.masterClient.subscribeToResponseOf('deleteContactUs');

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
  * Send message to required micro-service to fetch all the contact us
  */
  async fetchAllContactUs(page: number, searchText: string, lang: string) {
    try {

      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_CONTACT_US_PATTERN[MODULE_CONFIG.transport].fetchAllContactUs,
          { page, searchText, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch contact us by given id
   */
  async findContactUsById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_CONTACT_US_PATTERN[MODULE_CONFIG.transport].findContactUsById,
          { uuid, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create contact us
   */
  async createContactUs(auth: any, lang: string, data: CreateContactUsBody) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_CONTACT_US_PATTERN[MODULE_CONFIG.transport].createContactUs,
          { auth, lang, data },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete contact us
   */
  async deleteContactUs(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_CONTACT_US_PATTERN[MODULE_CONFIG.transport].deleteContactUs,
          { uuid, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

}
