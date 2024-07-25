/**
 * @fileoverview
 * Brand service file to handle all related functionality.
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
import { MASTER_MS_BRAND_PATTERN } from './pattern';
import {
  CreateBrandBody,
  ToggleBrandVisibilityBody,
  UpdateBrandBody
} from './types';

@Injectable()
export class BrandService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('MASTER_MICROSERVICE')
    private readonly masterClient: ClientKafka | ClientProxy | any,
  ) { }

  async onModuleInit() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.masterClient.subscribeToResponseOf('findBrandById');
      this.masterClient.subscribeToResponseOf('fetchAllDeletedBrand');
      this.masterClient.subscribeToResponseOf('fetchAllBrandForDropdown');
      this.masterClient.subscribeToResponseOf('fetchAllBrand');
      this.masterClient.subscribeToResponseOf('createBrand');
      this.masterClient.subscribeToResponseOf('restoreBrand');
      this.masterClient.subscribeToResponseOf('updateBrand');
      this.masterClient.subscribeToResponseOf('deleteBrand');
      this.masterClient.subscribeToResponseOf('toggleBrandVisibility');

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
  * Send message to required micro-service to fetch all the brand
  */
  async fetchAllBrand(page: number, searchText: string, lang: string) {
    try {

      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_BRAND_PATTERN[MODULE_CONFIG.transport].fetchAllBrand,
          { page, searchText, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the deleted brand
   */
  async fetchAllDeletedBrand(page: number, searchText: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_BRAND_PATTERN[MODULE_CONFIG.transport]
            .fetchAllDeletedBrand,
          { page, searchText, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
* @description
* Send message to required micro-service to fetch all the brand for dropdown
*/
  async fetchAllBrandForDropdown(lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_BRAND_PATTERN[MODULE_CONFIG.transport].fetchAllBrandForDropdown,
          { lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch brand by given id
   */
  async findBrandById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_BRAND_PATTERN[MODULE_CONFIG.transport].findBrandById,
          { uuid, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create brand
   */
  async createBrand(auth: any, lang: string, data: CreateBrandBody) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_BRAND_PATTERN[MODULE_CONFIG.transport].createBrand,
          { auth, lang, data },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update brand visibility i.e: active, inactive
   */
  async toggleBrandVisibility(
    uuid: string,
    auth: any,
    lang: string,
    payload: ToggleBrandVisibilityBody,
  ) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_BRAND_PATTERN[MODULE_CONFIG.transport]
            .toggleBrandVisibility,
          { uuid, auth, lang, data: payload },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update brand
   */
  async updateBrand(uuid: string, auth: any, lang: string, payload: UpdateBrandBody) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_BRAND_PATTERN[MODULE_CONFIG.transport].updateBrand,
          { uuid, auth, lang, data: payload },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete brand
   */
  async deleteBrand(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_BRAND_PATTERN[MODULE_CONFIG.transport].deleteBrand,
          { uuid, auth, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to restore deleted brand
   */
  async restoreBrand(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_BRAND_PATTERN[MODULE_CONFIG.transport].restoreBrand,
          { uuid, auth, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }
}
