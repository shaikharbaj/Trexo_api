/**
 * @fileoverview
 * User Address service file to handle all Address logic functionality.
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
import { lastValueFrom } from 'rxjs';
import { MODULE_CONFIG } from './module.config';
import { USER_ADDRESS_PATTERN } from './pattern';

@Injectable()
export class UserAddressService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('USER_MICROSERVICE')
    private readonly userClient: ClientProxy | ClientKafka | any,
  ) { }
  async onModuleInit() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.userClient.subscribeToResponseOf('fetchAllAddress');
      this.userClient.subscribeToResponseOf('findAddressById');
      this.userClient.subscribeToResponseOf('createAddress');
      this.userClient.subscribeToResponseOf('updateAddress');
      this.userClient.subscribeToResponseOf('deleteAddress');
      this.userClient.subscribeToResponseOf('toggleAddressDefault');
      this.userClient.subscribeToResponseOf('fetchAllAddressDeleted');
      this.userClient.subscribeToResponseOf('restoreAddressById');
      this.userClient.connect();
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.userClient.close();
    }
  }
  /**
   * @description
   * Send message to required micro-service to fetch all the address
   */
  async fetchAllAddress(page: number, type: string, lang: string) {
    try {
      return await lastValueFrom(this.userClient.send(
        USER_ADDRESS_PATTERN[MODULE_CONFIG.transport].fetchAllAddress,
        { page, type, lang },
      ));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch address by given id
   */
  async findAddressById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(this.userClient.send(
        USER_ADDRESS_PATTERN[MODULE_CONFIG.transport].findAddressById,
        { uuid, lang }
      ));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create address
   */
  async createAddress(auth: any, data: any, lang: string) {
    try {
      return await lastValueFrom(this.userClient.send(
        USER_ADDRESS_PATTERN[MODULE_CONFIG.transport].createAddress,
        { auth, data, lang },
      ));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update address
   */
  async updateAddress(uuid: string, payload: any, auth: any, lang: string) {
    try {
      return await lastValueFrom(this.userClient.send(
        USER_ADDRESS_PATTERN[MODULE_CONFIG.transport].updateAddress,
        { auth: auth, uuid: uuid, data: payload, lang: lang },
      ));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete address
   */
  async deleteAddress(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(this.userClient.send(
        USER_ADDRESS_PATTERN[MODULE_CONFIG.transport].deleteAddress,
        { auth: auth, uuid: uuid, lang: lang },
      ));
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update address visibility i.e: active, inactive
   */
  async toggleAddressDefault(uuid: string, payload: any, auth: any, lang: string) {
    try {
      return await lastValueFrom(this.userClient.send(
        USER_ADDRESS_PATTERN[MODULE_CONFIG.transport].toggleAddressDefault,
        { auth: auth, uuid: uuid, data: payload, lang: lang },
      ));
    } catch (error) {
      throw error;
    }
  }

  /**
 * @description
 * Send message to required micro-service to fetch all the deleted address
 */
  async fetchAllAddressDeleted(page: number, searchText: string, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_ADDRESS_PATTERN[MODULE_CONFIG.transport]
            .fetchAllAddressDeleted,
          { page, searchText, lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
 * @description
 * Send message to required micro-service to restore deleted address
 */
  async restoreAddressById(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_ADDRESS_PATTERN[MODULE_CONFIG.transport].restoreAddressById,
          { uuid: uuid, auth, lang: lang },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

}
