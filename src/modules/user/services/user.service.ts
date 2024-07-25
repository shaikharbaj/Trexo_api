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
import { MODULE_CONFIG } from "../module.config";
import { USER_MS_PATTERN } from "../pattern";
import { BuyerLoginBody, RegisterBuyerBody } from "../types";

@Injectable()
export class UserService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject("USER_MICROSERVICE")
    private readonly userClient: ClientKafka | ClientProxy | any
  ) {}
  async onModuleInit() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.userClient.subscribeToResponseOf("registerBuyer");
      this.userClient.subscribeToResponseOf("loginBuyer");
    }
  }

  async onModuleDestroy() {
    if (MODULE_CONFIG.transport === "KAFKA") {
      this.userClient.close();
    }
  }

  async registerBuyer(body: RegisterBuyerBody) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_PATTERN[MODULE_CONFIG.transport].registerBuyer,
          { data: body }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  async loginBuyer(body: BuyerLoginBody) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_PATTERN[MODULE_CONFIG.transport].loginBuyer,
          { data: body }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  async sendBuyerRegisterOTP(body: any) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_PATTERN[MODULE_CONFIG.transport].sendBuyerRegisterOTP,
          { data: body }
        )
      );
    } catch (error) {
      throw error;
    }
  }

  async verifyBuyerRegisterOTP(body: any) {
    try {
      return await lastValueFrom(
        this.userClient.send(
          USER_MS_PATTERN[MODULE_CONFIG.transport].verifyBuyerRegisterOTP,
          { data: body }
        )
      );
    } catch (error) {
      throw error;
    }
  }
}
