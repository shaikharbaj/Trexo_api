/**
 * @fileoverview
 * Testimonial controller file to handle all the testimonial requests.
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
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { TestimonialService } from "./testimonial.service";
import { TESTIMONIAL_MODULE_PERMISSION } from "./permission";
import { AuthGuard, LangGuard, RoleGuard } from "../auth/guard";
import { Auth, HasPermission, Lang } from "src/common/decorators";
import {
  CreateTestimonialBody,
  UpdateTestimonialBody,
  ToggleTestimonialVisibilityBody,
} from "./types";
@Controller("testimonial")
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}
  /**
   * @description
   * Rest API to fetch all the Testimonials.
   */
  @HasPermission(TESTIMONIAL_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get()
  async fetchAllTestimonials(
    @Query() { page, searchText }: any,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.testimonialService.fetchAllTestimonials(
        page,
        searchText,
        lang
      );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response.data,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to fetch Testimonial by given id
   */
  @HasPermission(TESTIMONIAL_MODULE_PERMISSION.LIST)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Get(":uuid")
  async findTestimonialById(@Param("uuid") uuid: string, @Lang() lang: string) {
    try {
      const response: any = await this.testimonialService.findTestimonialById(
        uuid,
        lang
      );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
        data: response.data,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to create testimonial
   */
  @HasPermission(TESTIMONIAL_MODULE_PERMISSION.ADD)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Post()
  async createTestimonial(
    @Auth() auth: any,
    @Body() data: CreateTestimonialBody,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.testimonialService.createTestimonial(
        auth,
        data,
        lang
      );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to update testimonial
   */
  @HasPermission(TESTIMONIAL_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch(":uuid")
  async updateTestimonial(
    @Auth() auth: any,
    @Body() data: UpdateTestimonialBody,
    @Param("uuid") uuid: string,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.testimonialService.updateTestimonial(
        uuid,
        auth,
        data,
        lang
      );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to delete Testimonial
   */
  @HasPermission(TESTIMONIAL_MODULE_PERMISSION.DELETE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Delete(":uuid")
  async deleteTestimonial(
    @Param("uuid") uuid: string,
    @Lang() lang: string
  ) {
    try {
      const response: any = await this.testimonialService.deleteTestimonial(
        uuid,
        lang
      );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * @description
   * Rest API to update testimonial visibility i.e: active, inactive
   */
  @HasPermission(TESTIMONIAL_MODULE_PERMISSION.UPDATE)
  @UseGuards(AuthGuard, RoleGuard, LangGuard)
  @Patch("toggle/visibility/:uuid")
  async toggleTestimonialVisibility(
    @Param("uuid") uuid: string,
    @Auth() auth: any,
    @Body() body: ToggleTestimonialVisibilityBody,
    @Lang() lang: string
  ) {
    try {
      const response: any =
        await this.testimonialService.toggleTestimonialVisibility(
          uuid,
          auth,
          body,
          lang
        );
      return {
        statusCode: HttpStatus.OK,
        status: response?.status,
        message: response?.message,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
