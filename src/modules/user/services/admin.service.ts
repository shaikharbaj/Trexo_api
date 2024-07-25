/**
 * @fileoverview
 * Admin service file to handle all admin functionality.
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
  NotFoundException,
} from '@nestjs/common';
import { ClientKafka, ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { MODULE_CONFIG } from '../module.config';
import { USER_MS_ADMIN_PATTERN } from '../pattern';
import { CreateAdminUserBody, ToggleAdminUserVisibilityBody, UpdateAdminUserBody } from '../types';

@Injectable()
export class AdminService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('USER_MICROSERVICE')
    private readonly userClient: ClientKafka | ClientProxy | any,
  ) {}

  async onModuleInit() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.userClient.subscribeToResponseOf('fetchAllAdminUser');
      this.userClient.subscribeToResponseOf('fetchAllDeletedAdminUser');
      this.userClient.subscribeToResponseOf('findAdminUserById');
      this.userClient.subscribeToResponseOf('createAdminUser');
      this.userClient.subscribeToResponseOf('toggleAdminUserVisibility');
      this.userClient.subscribeToResponseOf('updateAdminUser');
      this.userClient.subscribeToResponseOf('deleteAdminUser');
      this.userClient.subscribeToResponseOf('restoreAdminUser');
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
   * Send message to required micro-service to fetch all the country
   */
  async fetchAllAdminUser(page: number, searchText: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport].fetchAllAdminUser,
          { page, searchText },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the deleted admin users
   */
  async fetchAllDeletedAdminUser(page: number, searchText: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport]
            .fetchAllDeletedAdminUser,
          { page, searchText },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the admin user in dropdown
   */
  async fetchAllAdminUserForDropdown() {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport].fetchAllAdminUserForDropdown,
          {},
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch admin user by given uuid
   */
  async findAdminUserById(uuid: string) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport].findAdminUserById,
          { uuid },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create new admin user
   */
  async createAdminUser(auth: any, data: CreateAdminUserBody) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport].createAdminUser,
          { auth, data },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update admin user visibility i.e: active, inactive
   */
  async toggleAdminUserVisibility(
    uuid: string,
    auth: any,
    payload: ToggleAdminUserVisibilityBody,
  ) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport]
            .toggleAdminUserVisibility,
          { uuid: uuid, auth, data: payload },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update admin user
   */
  async updateAdminUser(uuid: string, auth: any, payload: UpdateAdminUserBody) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport].updateAdminUser,
          { uuid: uuid, auth, data: payload },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete admin user
   */
  async deleteAdminUser(uuid: string, auth: any) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport].deleteAdminUser,
          { uuid: uuid, auth },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to restore deleted admin user
   */
  async restoreAdminUser(uuid: string, auth: any) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_ADMIN_PATTERN[MODULE_CONFIG.transport].restoreAdminUser,
          { uuid: uuid, auth },
        ),
      );
    } catch (error) {
      throw error;
    }
  }
}
