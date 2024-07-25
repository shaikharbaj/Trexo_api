/**
 * @fileoverview
 * Role service file to handle all role logic functionality.
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
import { ROLE_PATTERN } from './pattern';
import { MODULE_CONFIG } from './module.config';
import { CreateRoleBody } from './types';


@Injectable()
export class RoleService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('USER_MICROSERVICE')
    private readonly userClient: ClientKafka | ClientProxy | any,
  ) {}

  async onModuleInit() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.userClient.subscribeToResponseOf('fetchAllRole');
      this.userClient.subscribeToResponseOf('fetchAllRoleForDropdown');
      this.userClient.subscribeToResponseOf('findRoleById');
      this.userClient.subscribeToResponseOf('createRole');
      this.userClient.subscribeToResponseOf('updateRole');
      this.userClient.subscribeToResponseOf('deleteRole');
      this.userClient.subscribeToResponseOf('toggleRoleVisibility');
      this.userClient.subscribeToResponseOf('attachPermissionsToRole');
      this.userClient.subscribeToResponseOf('fetchRolesPermissions');
      this.userClient.subscribeToResponseOf('fetchAllRolesMeta');
      this.userClient.subscribeToResponseOf('fetchAllRolesDeleted');
      this.userClient.subscribeToResponseOf('restoreRoleById');
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
   * Send message to required micro-service to fetch all the role
   */
  async fetchAllRole(
    page: number,
    searchText: string,
  ) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          ROLE_PATTERN[MODULE_CONFIG.transport].fetchAllRole,
          { page, searchText },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the deleted role
   */
  async fetchAllRolesDeleted(
    page: number,
    searchText: string
  ) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          ROLE_PATTERN[MODULE_CONFIG.transport].fetchAllRolesDeleted,
          { page, searchText },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the role for dropdown
   */
  async fetchAllRoleForDropdown() {
    try {
      return await lastValueFrom(
        this.userClient.send(
          ROLE_PATTERN[MODULE_CONFIG.transport].fetchAllRoleForDropdown,
          {},
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch roles meta Obj
   */
  async fetchAllRolesMeta() {
    try {
      return await lastValueFrom(
        this.userClient.send(
          ROLE_PATTERN[MODULE_CONFIG.transport].fetchAllRolesMeta,
          {},
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch role by given id
   */
  async findRoleById(id: number) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          ROLE_PATTERN[MODULE_CONFIG.transport].findRoleById,
          { id: id },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to role create
   */
  async createRole(auth: any, data: CreateRoleBody) {
    try {
      return await lastValueFrom(
        this.userClient.send(ROLE_PATTERN[MODULE_CONFIG.transport].createRole, {
          auth,
          data,
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update role visibility i.e: active, inactive
   */
  async toggleRoleVisibility(id: number, data: any, auth: any) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          ROLE_PATTERN[MODULE_CONFIG.transport].toggleRoleVisibility,
          {
            auth,
            id,
            data,
          },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update role
   */
  async updateRole(id: number, auth: any, data: any) {
    try {
      return await lastValueFrom(
        this.userClient.send(ROLE_PATTERN[MODULE_CONFIG.transport].updateRole, {
          id,
          auth,
          data,
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete role
   */
  async deleteRole(id: number, auth: any) {
    try {
      return await lastValueFrom(
        this.userClient.send(ROLE_PATTERN[MODULE_CONFIG.transport].deleteRole, {
          auth,
          id,
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to restore role by given id
   */
  async restoreRoleById(id: number) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          ROLE_PATTERN[MODULE_CONFIG.transport].restoreRoleById,
          { id: id },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to add permission to role
   */
  async attachPermissionsToRole(auth: any, data: any) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          ROLE_PATTERN[MODULE_CONFIG.transport].attachPermissionsToRole,
          {
            auth,
            data,
          },
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch permissions of requested roles
   */
  async fetchRolesPermissions(roleIds: any) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          ROLE_PATTERN[MODULE_CONFIG.transport].fetchRolesPermissions,
          { roleIds: roleIds },
        ),
      );
    } catch (error) {
      throw error;
    }
  }
}
