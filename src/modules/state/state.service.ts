/**
 * @fileoverview
 * state service file to handle all related functionality.
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
import { MASTER_MS_STATES_PATTERN } from "./pattern";
import {
  CreateStateBody,
  UpdateStateBody,
  toggleStateVisibilityBody,
} from "./types";

@Injectable()
export class StateService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("MASTER_MICROSERVICE")
    private readonly masterClient: ClientKafka | ClientProxy | any
  ) {}

  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.masterClient.subscribeToResponseOf("fetchAllState");
      this.masterClient.subscribeToResponseOf("fetchAllStateForDropdown");
      this.masterClient.subscribeToResponseOf("fetchAllDeletedState");
      this.masterClient.subscribeToResponseOf("findStateById");
      this.masterClient.subscribeToResponseOf("createState");
      this.masterClient.subscribeToResponseOf("updateState");
      this.masterClient.subscribeToResponseOf("deleteState");
      this.masterClient.subscribeToResponseOf("restoreDeletedState");
      this.masterClient.subscribeToResponseOf("toggleStateVisibility");
      this.masterClient.connect();
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.masterClient.close();
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the state
   */
  async fetchAllState(page: number, searchText: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_STATES_PATTERN[MODULE_CONFIG.transport].fetchAllState,
          { page, searchText, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
  /**
   * @description
   * Send message to required micro-service to fetch all the state for dropdown
   */
  async fetchAllStateForDropdown(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_STATES_PATTERN[MODULE_CONFIG.transport]
            .fetchAllStateForDropdown,
          { uuid: uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all deleted the state
   */
  async fetchAllDeletedState(page: number, searchText: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_STATES_PATTERN[MODULE_CONFIG.transport]
            .fetchAllDeletedState,
          { page, searchText, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
  /**
   * @description
   * Send message to required micro-service to fetch state by given id
   */
  async findStateById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_STATES_PATTERN[MODULE_CONFIG.transport].findStateById,
          { uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create state
   */
  async createState(auth: any, data: CreateStateBody, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_STATES_PATTERN[MODULE_CONFIG.transport].createState,
          {
            auth,
            data,
            lang,
          }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update state
   */
  async updateState(
    uuid: string,
    auth: any,
    payload: UpdateStateBody,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_STATES_PATTERN[MODULE_CONFIG.transport].updateState,
          { uuid, auth, data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to restore deleted state
   */
  async restoreDeletedState(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_STATES_PATTERN[MODULE_CONFIG.transport].restoreDeletedState,
          { uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete state
   */
  async deleteState(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_STATES_PATTERN[MODULE_CONFIG.transport].deleteState,
          { uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update state visibility i.e: active, inactive
   */
  async toggleStateVisibility(
    uuid: string,
    auth: any,
    payload: toggleStateVisibilityBody,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_STATES_PATTERN[MODULE_CONFIG.transport]
            .toggleStateVisibility,
          { uuid: uuid, auth, data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
