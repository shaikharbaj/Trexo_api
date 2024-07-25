/**
 * @fileoverview
 * Division service file to handle all related functionality.
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
import { PRODUCT_MS_DIVISION_PATTERN } from './pattern';
import {
  CreateDivisionBody,
  ToggleDivisionVisibilityBody,
  UpdateDivisionBody
} from './types';

@Injectable()
export class DivisionService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('PRODUCT_MICROSERVICE')
    private readonly productClient: ClientKafka | ClientProxy | any,
  ) { }

  async onModuleInit() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.productClient.subscribeToResponseOf('findDivisionById');
      this.productClient.subscribeToResponseOf('fetchAllDeletedDivision');
      this.productClient.subscribeToResponseOf('fetchAllDivisionForDropdown');
      this.productClient.subscribeToResponseOf('fetchAllDivision');
      this.productClient.subscribeToResponseOf('createDivision');
      this.productClient.subscribeToResponseOf('restoreDivision');
      this.productClient.subscribeToResponseOf('updateDivision');
      this.productClient.subscribeToResponseOf('deleteDivision');
      this.productClient.subscribeToResponseOf('toggleDivisionVisibility');

      this.productClient.connect();
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.productClient.close();
    }
  }

  /**
  * @description
  * Send message to required micro-service to fetch all the division
  */
  async fetchAllDivision(page: number, searchText: string, lang: string) {
    try {

      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_DIVISION_PATTERN[MODULE_CONFIG.transport].fetchAllDivision,
          { page, searchText, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the deleted division
   */
  async fetchAllDeletedDivision(page: number, searchText: string, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_DIVISION_PATTERN[MODULE_CONFIG.transport]
            .fetchAllDeletedDivision,
          { page, searchText, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
* @description
* Send message to required micro-service to fetch all the division for dropdown
*/
  async fetchAllDivisionForDropdown(lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_DIVISION_PATTERN[MODULE_CONFIG.transport].fetchAllDivisionForDropdown,
          { lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch division by given id
   */
  async findDivisionById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_DIVISION_PATTERN[MODULE_CONFIG.transport].findDivisionById,
          { uuid, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create division
   */
  async createDivision(auth: any, lang: string, data: CreateDivisionBody) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_DIVISION_PATTERN[MODULE_CONFIG.transport].createDivision,
          { auth, lang, data },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update division visibility i.e: active, inactive
   */
  async toggleDivisionVisibility(
    uuid: string,
    auth: any,
    lang: string,
    payload: ToggleDivisionVisibilityBody,
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_DIVISION_PATTERN[MODULE_CONFIG.transport]
            .toggleDivisionVisibility,
          { uuid, auth, lang, data: payload },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update division
   */
  async updateDivision(uuid: string, auth: any, lang: string, payload: UpdateDivisionBody) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_DIVISION_PATTERN[MODULE_CONFIG.transport].updateDivision,
          { uuid, auth, lang, data: payload },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete division
   */
  async deleteDivision(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_DIVISION_PATTERN[MODULE_CONFIG.transport].deleteDivision,
          { uuid, auth, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to restore deleted division
   */
  async restoreDivision(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_DIVISION_PATTERN[MODULE_CONFIG.transport].restoreDivision,
          { uuid, auth, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }
}
