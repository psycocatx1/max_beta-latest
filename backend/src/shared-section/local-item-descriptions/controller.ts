import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  Put,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { CrudService, ListService } from "./services";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import {
  example_local_item_description,
  example_local_item_descriptions_list_result,
} from "./example.data";
import {
  LocalItemDescriptionsFiltersDto,
  CreateLocalItemDescriptionDto,
  UpdateLocalItemDescriptionDto,
} from "./dto";
import {
  Roles,
  JwtAuthGuard,
  RolesGuard,
  ImageUploadInterceptor,
} from "@lib/common";
import { Role } from "@lib/prisma";
/**
 * Контроллер для описаний объектов
 */
@Controller("local-item-descriptions")
export class LocalItemDescriptionsController {
  constructor(
    private readonly listService: ListService,
    private readonly crudService: CrudService,
  ) {}

  @Get()
  @ApiQuery({ type: LocalItemDescriptionsFiltersDto })
  @ApiResponse({
    status: 200,
    description: "Список описаний объектов успешно получен",
    example: example_local_item_descriptions_list_result,
  })
  @ApiOperation({
    summary: "Получение списка описаний объектов с пагинацией и сортировкой",
  })
  async getLocalItemDescriptions(
    @Query() filters: LocalItemDescriptionsFiltersDto,
  ) {
    return this.listService.getLocalItemDescriptions(filters);
  }

  @Get(":id")
  @ApiOperation({ summary: "Получение описания объекта по id" })
  @ApiResponse({
    status: 200,
    description: "Описание объекта успешно получено",
    example: example_local_item_description,
  })
  async getLocalItemDescription(@Param("id", ParseUUIDPipe) id: string) {
    return this.crudService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ImageUploadInterceptor)
  @ApiOperation({ summary: "Создание описания объекта" })
  @ApiResponse({
    status: 201,
    description: "Описание объекта успешно создано",
    example: example_local_item_description,
  })
  @ApiQuery({
    description: "Данные для создания описания объекта",
    schema: {
      type: "object",
      properties: {
        content: { type: "string" },
        title: { type: "string" },
        type: { type: "string", enum: ["TEXT", "IMAGE"] },
        local_product_id: { type: "string" },
        local_service_id: { type: "string" },
        is_excluded: { type: "boolean" },
        file: { type: "string", format: "binary" },
      },
      required: ["title", "type"],
    },
  })
  async createLocalItemDescription(
    @Body() data: CreateLocalItemDescriptionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.crudService.create(data, file);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ImageUploadInterceptor)
  @ApiOperation({ summary: "Обновление описания объекта" })
  @ApiResponse({
    status: 200,
    description: "Описание объекта успешно обновлено",
    example: example_local_item_description,
  })
  @ApiQuery({
    description: "Данные для обновления описания объекта",
    schema: {
      type: "object",
      properties: {
        content: { type: "string" },
        title: { type: "string" },
        type: { type: "string", enum: ["TEXT", "IMAGE"] },
        local_product_id: { type: "string" },
        local_service_id: { type: "string" },
        is_excluded: { type: "boolean" },
        file: { type: "string", format: "binary" },
      },
    },
  })
  async updateLocalItemDescription(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() data: UpdateLocalItemDescriptionDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.crudService.update(id, data, file);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Удаление описания объекта" })
  @ApiResponse({ status: 200, description: "Описание объекта успешно удалено" })
  async deleteLocalItemDescription(@Param("id", ParseUUIDPipe) id: string) {
    return this.crudService.delete(id);
  }

  @Post("reindex")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Реиндексация описаний объекта" })
  @ApiResponse({
    status: 200,
    description: "Описания успешно реиндексированы",
  })
  async reindexDescriptions(
    @Body() body: { local_product_id?: string; local_service_id?: string },
  ) {
    await this.crudService.reindexDescriptions(
      body.local_product_id,
      body.local_service_id,
    );
    return { message: "Описания успешно реиндексированы" };
  }
}
