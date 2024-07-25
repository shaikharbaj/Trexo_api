/**
 * @fileoverview
 * Tax service file to handle all Tax logic functionality.
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
import { TAX_MASTER_MS_PATTERN } from './pattern';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TaxService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('MASTER_MICROSERVICE')
    private readonly masterClient: ClientProxy | ClientKafka | any,
  ) { }
  async onModuleInit() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.masterClient.subscribeToResponseOf('fetchAllTax');
      this.masterClient.subscribeToResponseOf('findTaxById');
      this.masterClient.subscribeToResponseOf('createTax');
      this.masterClient.subscribeToResponseOf('updateTax');
      this.masterClient.subscribeToResponseOf('deleteTax');
      this.masterClient.subscribeToResponseOf('toggleTaxVisibility');
      this.masterClient.subscribeToResponseOf('importTax');
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
   * Send message to required micro-service to fetch all the tax
   */
  async fetchAllTax(page: number, type: string, lang: string) {
    try {
      return await lastValueFrom(this.masterClient.send(
        TAX_MASTER_MS_PATTERN[MODULE_CONFIG.transport].fetchAllTax,
        { page, type, lang },
      ));
    } catch (error) {
      throw error;
    }
  }

  /**
 * @description
 * Send message to required micro-service to fetch all the deleted tax
 */
  async fetchAllDeletedTax(page: number, searchText: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          TAX_MASTER_MS_PATTERN[MODULE_CONFIG.transport]
            .fetchAllDeletedTax,
          { page, searchText, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch tax by given id
   */
  async findTaxById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(this.masterClient.send(
        TAX_MASTER_MS_PATTERN[MODULE_CONFIG.transport].findTaxById,
        uuid, lang
      ));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create tax
   */
  async createTax(auth: any, data: any, lang: string) {
    try {
      return await lastValueFrom(this.masterClient.send(
        TAX_MASTER_MS_PATTERN[MODULE_CONFIG.transport].createTax,
        { auth, data, lang },
      ));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update tax
   */
  async updateTax(uuid: string, payload: any, auth: any, lang: string) {
    try {
      return await lastValueFrom(this.masterClient.send(
        TAX_MASTER_MS_PATTERN[MODULE_CONFIG.transport].updateTax,
        { auth: auth, uuid: uuid, data: payload, lang: lang },
      ));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete tax
   */
  async deleteTax(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(this.masterClient.send(
        TAX_MASTER_MS_PATTERN[MODULE_CONFIG.transport].deleteTax,
        { auth: auth, uuid: uuid, lang: lang },
      ));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update tax visibility i.e: active, inactive
   */
  async toggleTaxVisibility(uuid: string, payload: any, auth: any, lang: string) {
    try {
      return await lastValueFrom(this.masterClient.send(
        TAX_MASTER_MS_PATTERN[MODULE_CONFIG.transport].toggleTaxVisibility,
        { auth: auth, uuid: uuid, data: payload, lang: lang },
      ));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to import tax file
   */
  async importTax(auth: any, file: any, lang: string) {
    try {
      return await lastValueFrom(this.masterClient.send(
        TAX_MASTER_MS_PATTERN[MODULE_CONFIG.transport].importTax,
        { auth: auth, data: file, lang: lang },
      ));
    } catch (error) {
      throw error;
    }
  }

  /**
 * @description
 * Send message to required micro-service to restore deleted tax
 */
  async restoreTax(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          TAX_MASTER_MS_PATTERN[MODULE_CONFIG.transport].restoreTax,
          { uuid: uuid, auth, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }
}
