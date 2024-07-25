import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { MODULE_CONFIG } from './module.config';
import { PERMISSION_PATTERN } from './pattern';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PermissionService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('USER_MICROSERVICE') 
    private readonly userClient: ClientKafka | ClientProxy | any,
  ) { }

  async onModuleInit() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.userClient.subscribeToResponseOf('fetchAllPermissions');
      this.userClient.subscribeToResponseOf('findPermissionsById');
      this.userClient.subscribeToResponseOf('createPermissions');
      this.userClient.subscribeToResponseOf('updatePermissions');
      this.userClient.subscribeToResponseOf('deletePermissions');
      this.userClient.connect();
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === 'KAFKA') {
      this.userClient.close();
    }
  }

  async fetchAllPermissions() {
    try {
      return await lastValueFrom(
        this.userClient.send(PERMISSION_PATTERN[MODULE_CONFIG.transport].fetchAllPermissions, {}),
      );
    } catch (error) {
      throw error;
    }
  }

  async findPermissionsById(id: number) {
    try {
      return await lastValueFrom(this.userClient.send(PERMISSION_PATTERN[MODULE_CONFIG.transport].findPermissionsById, { id }));
    } catch (error) {
      throw error;
    }
  }

  async createPermissions(auth: any, data: any) {
    try {
      return await lastValueFrom(this.userClient.send(PERMISSION_PATTERN[MODULE_CONFIG.transport].createPermissions, { auth, data }));
    } catch (error) {
     throw error;
    }
  }

  async updatePermissions(id: number, data: any, auth: any) {
    try {
      return await lastValueFrom(this.userClient.send(PERMISSION_PATTERN[MODULE_CONFIG.transport].updatePermissions, {
        auth,
        id,
        data,
      }));
    } catch (error) {
      throw error;
    }
  }

  async deletePermissions(id: number, auth: any) {
    try {
      return await lastValueFrom(this.userClient.send(PERMISSION_PATTERN[MODULE_CONFIG.transport].deletePermissions, { auth, id }));
    } catch (error) {
      throw error;
    }
  }
}
