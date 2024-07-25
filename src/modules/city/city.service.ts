/**
 * @fileoverview
 * City service file to handle all related functionality.
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
import { MASTER_MS_CITY_PATTERN } from "./pattern";
import {
  CreateCityBody,
  UpdateCityBody,
  ToggleCityVisibilityBody,
} from "./types";

@Injectable()
export class CityService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("MASTER_MICROSERVICE")
    private readonly masterClient: ClientKafka | ClientProxy | any
  ) {}

  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      if (MODULE_CONFIG.transport === "KAFKA") {
        this.masterClient.subscribeToResponseOf("fetchAllCity");
        this.masterClient.subscribeToResponseOf("fetchAllCityForDropdown");
        this.masterClient.subscribeToResponseOf("fetchAllDeletedCity");
        this.masterClient.subscribeToResponseOf("findCityById");
        this.masterClient.subscribeToResponseOf("createCity");
        this.masterClient.subscribeToResponseOf("updateCity");
        this.masterClient.subscribeToResponseOf("deleteCity");
        this.masterClient.subscribeToResponseOf("toggleCityVisibility");
        this.masterClient.subscribeToResponseOf("restoreDeletedCity");

        this.masterClient.connect();
      }
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.masterClient.close();
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the city
   */
  async fetchAllCity(page: number, searchText: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_CITY_PATTERN[MODULE_CONFIG.transport].fetchAllCity,
          { page, searchText, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
  /**
   * @description
   * Send message to required micro-service to fetch all the city for dropdown
   */
  async fetchAllCityForForDropdown(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_CITY_PATTERN[MODULE_CONFIG.transport]
            .fetchAllCityForDropdown,
          { uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the deleted city
   */
  async fetchAllDeletedCity(page: number, searchText: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_CITY_PATTERN[MODULE_CONFIG.transport].fetchAllDeletedCity,
          { page, searchText, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch city by given id
   */
  async findCityById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_CITY_PATTERN[MODULE_CONFIG.transport].findCityById,
          { uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create city
   */
  async createCity(auth: any, data: CreateCityBody, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_CITY_PATTERN[MODULE_CONFIG.transport].createCity,
          { auth, data, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update city
   */
  async updateCity(
    uuid: string,
    auth: any,
    data: UpdateCityBody,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_CITY_PATTERN[MODULE_CONFIG.transport].updateCity,
          { uuid, auth, data, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete city
   */
  async deleteCity(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_CITY_PATTERN[MODULE_CONFIG.transport].deleteCity,
          { uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to restore deleted city
   */
  async restoreDeletedCity(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_CITY_PATTERN[MODULE_CONFIG.transport].restoreDeletedCity,
          { uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update city visibility i.e: active, inactive
   */
  async toggleCityVisibility(
    uuid: string,
    auth: any,
    payload: ToggleCityVisibilityBody,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_CITY_PATTERN[MODULE_CONFIG.transport].toggleCityVisibility,
          { uuid: uuid, auth, data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
