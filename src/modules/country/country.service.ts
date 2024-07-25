/**
 * @fileoverview
 * Country service file to handle all related functionality.
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
import { MASTER_MS_COUNTRY_PATTERN } from "./pattern";
import {
  CreateCountryBody,
  UpdateCountryBody,
  toggleCountryBody,
} from "./types";

@Injectable()
export class CountryService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("MASTER_MICROSERVICE")
    private readonly masterClient: ClientKafka | ClientProxy | any
  ) {}

  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      if (MODULE_CONFIG.transport === "KAFKA") {
        this.masterClient.subscribeToResponseOf("fetchAllCountry");
        this.masterClient.subscribeToResponseOf("fetchAllCountryForDropdown");
        this.masterClient.subscribeToResponseOf("fetchAllDeletedCountry");
        this.masterClient.subscribeToResponseOf("findCountryById");
        this.masterClient.subscribeToResponseOf("createCountry");
        this.masterClient.subscribeToResponseOf("updateCountry");
        this.masterClient.subscribeToResponseOf("deleteCountry");
        this.masterClient.subscribeToResponseOf("restoreCountry");
        this.masterClient.subscribeToResponseOf("toggleCountryVisibility");

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
   * Send message to required micro-service to fetch all the country
   */
  async fetchAllCountry(page: number, searchText: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_COUNTRY_PATTERN[MODULE_CONFIG.transport].fetchAllCountry,
          { page, searchText, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the country in dropdown
   */
  async fetchAllCountryForDropdown(lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_COUNTRY_PATTERN[MODULE_CONFIG.transport]
            .fetchAllCountryForDropdown,
          { lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the deleted country
   */
  async fetchAllDeletedCountry(page: number, searchText: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_COUNTRY_PATTERN[MODULE_CONFIG.transport]
            .fetchAllDeletedCountry,
          { page, searchText, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch country by given id
   */
  async findCountryById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_COUNTRY_PATTERN[MODULE_CONFIG.transport].findCountryById,
          { uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
  /**
   * @description
   * Send message to required micro-service to create country
   */
  async createCountry(auth: any, data: CreateCountryBody, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_COUNTRY_PATTERN[MODULE_CONFIG.transport].createCountry,
          { auth, data, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update country
   */
  async updateCountry(
    uuid: string,
    auth: any,
    payload: UpdateCountryBody,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_COUNTRY_PATTERN[MODULE_CONFIG.transport].updateCountry,
          { uuid: uuid, auth, data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete country
   */
  async deleteCountry(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_COUNTRY_PATTERN[MODULE_CONFIG.transport].deleteCountry,
          { uuid: uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to restore deleted country
   */
  async restoreCountry(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_COUNTRY_PATTERN[MODULE_CONFIG.transport].restoreCountry,
          { uuid: uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update country visibility i.e: active, inactive
   */
  async toggleCountryVisibility(
    uuid: string,
    auth: any,
    payload: toggleCountryBody,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.masterClient.send(
          MASTER_MS_COUNTRY_PATTERN[MODULE_CONFIG.transport]
            .toggleCountryVisibility,
          { uuid: uuid, auth, data: payload, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
