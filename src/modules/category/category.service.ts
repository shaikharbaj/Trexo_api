/**
 * @fileoverview
 * Category service file to handle all related functionality.
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
import { PRODUCT_MS_CATEGORY_PATTERN } from "./pattern";
import {
  CreateCategoryBody,
  ToggleCategoryVisibilityBody,
  UpdateCategoryBody,
} from "./types";

@Injectable()
export class CategoryService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("PRODUCT_MICROSERVICE")
    private readonly productClient: ClientKafka | ClientProxy | any
  ) {}

  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.productClient.subscribeToResponseOf("findCategoryById");
      this.productClient.subscribeToResponseOf("fetchAllDeletedCategory");
      this.productClient.subscribeToResponseOf("fetchAllCategoryForDropdown");
      this.productClient.subscribeToResponseOf("fetchAllCategory");
      this.productClient.subscribeToResponseOf("createCategory");
      this.productClient.subscribeToResponseOf("restoreCategory");
      this.productClient.subscribeToResponseOf("updateCategory");
      this.productClient.subscribeToResponseOf("deleteCategory");
      this.productClient.subscribeToResponseOf("toggleCategoryVisibility");

      this.productClient.connect();
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.productClient.close();
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the category
   */
  async fetchAllCategory(page: number, searchText: string, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_CATEGORY_PATTERN[MODULE_CONFIG.transport].fetchAllCategory,
          { page, searchText, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the deleted category
   */
  async fetchAllDeletedCategory(
    page: number,
    searchText: string,
    lang: string
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_CATEGORY_PATTERN[MODULE_CONFIG.transport]
            .fetchAllDeletedCategory,
          { page, searchText, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch all the category for dropdown
   */
  async fetchAllCategoryForDropdown(lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_CATEGORY_PATTERN[MODULE_CONFIG.transport]
            .fetchAllCategoryForDropdown,
          { lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to fetch category by given id
   */
  async findCategoryById(uuid: string, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_CATEGORY_PATTERN[MODULE_CONFIG.transport].findCategoryById,
          { uuid, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to create category
   */
  async createCategory(auth: any, lang: string, data: CreateCategoryBody) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_CATEGORY_PATTERN[MODULE_CONFIG.transport].createCategory,
          { auth, lang, data }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update category visibility i.e: active, inactive
   */
  async toggleCategoryVisibility(
    uuid: string,
    auth: any,
    lang: string,
    payload: ToggleCategoryVisibilityBody
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_CATEGORY_PATTERN[MODULE_CONFIG.transport]
            .toggleCategoryVisibility,
          { uuid, auth, lang, data: payload }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to update category
   */
  async updateCategory(
    uuid: string,
    auth: any,
    lang: string,
    payload: UpdateCategoryBody
  ) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_CATEGORY_PATTERN[MODULE_CONFIG.transport].updateCategory,
          { uuid, auth, lang, data: payload }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to delete category
   */
  async deleteCategory(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_CATEGORY_PATTERN[MODULE_CONFIG.transport].deleteCategory,
          { uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Send message to required micro-service to restore deleted category
   */
  async restoreCategory(uuid: string, auth: any, lang: string) {
    try {
      return await lastValueFrom(
        this.productClient.send(
          PRODUCT_MS_CATEGORY_PATTERN[MODULE_CONFIG.transport].restoreCategory,
          { uuid, auth, lang }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
