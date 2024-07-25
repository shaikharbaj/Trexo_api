/**
 * @fileoverview
 * Cms service file to handle all related functionality.
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
} from "@nestjs/common";
import { ClientKafka, ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { MODULE_CONFIG } from "./module.config";
import { CMS_MS_CMS_PATTERN } from "./pattern";
import { CreateCmsBody, UpdateCmsBody, toggleCmsVisibilityBody } from "./types";
@Injectable()
export class CmsService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("CMS_MICROSERVICE")
    private readonly cmsClient: ClientKafka | ClientProxy | any
  ) {}

  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      if (MODULE_CONFIG.transport === "KAFKA") {
        this.cmsClient.subscribeToResponseOf("fetchAllCms");
        this.cmsClient.subscribeToResponseOf("fetchAllDeletedCms");
        this.cmsClient.subscribeToResponseOf("findCmsById");
        this.cmsClient.subscribeToResponseOf("createCms");
        this.cmsClient.subscribeToResponseOf("updateCms");
        this.cmsClient.subscribeToResponseOf("deleteCms");
        this.cmsClient.subscribeToResponseOf("restoreDeletedCms");
        this.cmsClient.subscribeToResponseOf("toggleCmsVisibility");
        this.cmsClient.connect();
      }
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.cmsClient.close();
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the cms
   */
  async fetchAllCms(page: number, searchText: string, lang: string) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_CMS_PATTERN[MODULE_CONFIG.transport].fetchAllCms,
          { page, searchText, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the deleted cms
   */
  async fetchAllDeletedCms(page: number, searchText: string, lang: string) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_CMS_PATTERN[MODULE_CONFIG.transport].fetchAllDeletedCms,
          { page, searchText, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch cmd by given id
   */
  async findCmsById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_CMS_PATTERN[MODULE_CONFIG.transport].findCmsById,
          { uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create cms
   */
  async createCms(auth: any, data: CreateCmsBody, lang: string) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_CMS_PATTERN[MODULE_CONFIG.transport].createCms,
          { auth, data, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update cms
   */
  async updateCms(
    uuid: string,
    auth: any,
    payload: UpdateCmsBody,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_CMS_PATTERN[MODULE_CONFIG.transport].updateCms,
          { uuid: uuid, auth, data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete cms
   */
  async deleteCms(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_CMS_PATTERN[MODULE_CONFIG.transport].deleteCms,
          { uuid: uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to restore deleted cms.
   */
  async restoreCms(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_CMS_PATTERN[MODULE_CONFIG.transport].restoreDeletedCms,
          { uuid: uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update cms visibility i.e: active, inactive
   */
  async toggleCmsVisibility(
    uuid: string,
    auth: any,
    payload: toggleCmsVisibilityBody,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.cmsClient.send(
          CMS_MS_CMS_PATTERN[MODULE_CONFIG.transport].toggleCmsVisibility,
          { uuid: uuid, auth, data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
