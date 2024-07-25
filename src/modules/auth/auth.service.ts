/**
 * @fileoverview
 * Auth service file to handle all authentication functionality.
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
} from "@nestjs/common";
import { ClientKafka, ClientProxy, RpcException } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { MODULE_CONFIG } from "./module.config";
import { AUTH_MS_PATTERN } from "./pattern";
import { AdminLoginBody } from "./types";

@Injectable()
export class AuthService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("AUTH_MICROSERVICE")
    private readonly authClient: ClientKafka | ClientProxy | any
  ) {}

  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.authClient.subscribeToResponseOf("veriryAccessToken");
      this.authClient.subscribeToResponseOf("veriryPermission");
      this.authClient.subscribeToResponseOf("adminLogin");
      this.authClient.subscribeToResponseOf("buyerLogin");
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.authClient.close();
    }
  }

  /**
   * @description
   * This API is use to verify the token which had generated during logn and return the response with status code
   */
  async verifyToken(token: string) {
    try {
      return await lastValueFrom(
        this.authClient.send(
          AUTH_MS_PATTERN[MODULE_CONFIG.transport].veriryAccessToken,
          { data: token }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * This API is use to verify the permission
   */
  async verifyPermission(auth: any, permission: string) {
    try {
      return await lastValueFrom(
        this.authClient.send(
          AUTH_MS_PATTERN[MODULE_CONFIG.transport].veriryPermission,
          {
            data: {
              auth,
              permission,
            },
          }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Login API to authenticate the admin and return the response with status code
   */
  async adminLogin(payload: AdminLoginBody) {
    try {
      return await lastValueFrom(
        this.authClient.send(
          AUTH_MS_PATTERN[MODULE_CONFIG.transport].adminLogin,
          { data: payload }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Login API to authenticate the admin and return the response with status code
   */
  async buyerLogin(payload: AdminLoginBody) {
    try {
      return await lastValueFrom(
        this.authClient.send(
          AUTH_MS_PATTERN[MODULE_CONFIG.transport].buyerLogin,
          { data: payload }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
