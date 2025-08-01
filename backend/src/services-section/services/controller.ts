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
import { ServiceFiltersDto } from "./dto/filters.dto";
import { CrudService } from "./services/crud.service";
import { ListService } from "./services/list.service";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  example_extended_services_list_result,
  example_extended_service,
} from "./example.data";
import { CreateServiceDto, UpdateServiceDto } from "./dto";
import {
  Roles,
  JwtAuthGuard,
  RolesGuard,
  ImageUploadInterceptor,
} from "@lib/common";
import { Role } from "@lib/prisma";
/**
 * Контроллер для услуг
 */
@ApiTags("Services")
@Controller("services")
export class ServicesController {
  constructor(
    private readonly listService: ListService,
    private readonly crudService: CrudService,
  ) { }

  @Get()
  @ApiQuery({ type: ServiceFiltersDto })
  @ApiResponse({
    status: 200,
    description: "Список услуг успешно получен",
    example: example_extended_services_list_result,
  })
  @ApiOperation({
    summary: "Получение списка услуг с пагинацией и сортировкой",
  })
  async getServices(@Query() filters: ServiceFiltersDto) {
    return this.listService.getServices(filters);
  }

  @Get(":id")
  @ApiOperation({ summary: "Получение услуги по id" })
  @ApiResponse({
    status: 200,
    description: "Услуга успешно получена",
    example: example_extended_service,
  })
  @ApiResponse({ status: 404, description: "Услуга не найдена" })
  @ApiResponse({ status: 400, description: "Некорректный id услуги" })
  @ApiResponse({ status: 403, description: "Доступ запрещен" })
  async getService(
    @Param("id", ParseUUIDPipe) id: string,
    @Query("locale_id", new ParseUUIDPipe({ optional: true })) locale_id?: string,
  ) {
    return this.crudService.findOne(id, locale_id);
  }

  @Get(":id/:locale_id")
  @ApiOperation({
    summary: "Получение локализованной услуги по id и locale_id",
  })
  @ApiResponse({
    status: 200,
    description: "Услуга успешно получена",
    example: example_extended_service,
  })
  @ApiResponse({
    status: 400,
    description: "Некорректный id или locale_id услуги",
  })
  @ApiResponse({ status: 404, description: "Услуга не найдена" })
  async getServiceByLocale(
    @Param("id", ParseUUIDPipe) id: string,
    @Param("locale_id", ParseUUIDPipe) locale_id: string,
  ) {
    return this.crudService.findOne(id, locale_id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ImageUploadInterceptor)
  @ApiOperation({ summary: "Создание услуги" })
  @ApiResponse({
    status: 201,
    description: "Услуга успешно создана",
    example: example_extended_service,
  })
  @ApiResponse({ status: 400, description: "Некорректные данные" })
  @ApiResponse({ status: 403, description: "Доступ запрещен" })
  @ApiQuery({
    description: "Данные для создания услуги",
    schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        image: { type: "string" },
        file: { type: "string", format: "binary" },
        category_id: { type: "string" },
        price_USD: { type: "number" },
        discount_price_USD: { type: "number" },
      },
      required: [
        "name",
        "description",
        "category_id",
        "price_USD",
        "discount_price_USD",
      ],
    },
  })
  async createService(
    @Body() data: CreateServiceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.crudService.create(data, file);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ImageUploadInterceptor)
  @ApiOperation({ summary: "Обновление услуги" })
  @ApiResponse({
    status: 200,
    description: "Услуга успешно обновлена",
    example: example_extended_service,
  })
  @ApiResponse({ status: 400, description: "Некорректные данные" })
  @ApiResponse({ status: 403, description: "Доступ запрещен" })
  @ApiResponse({ status: 404, description: "Услуга не найдена" })
  @ApiQuery({
    description: "Данные для обновления услуги",
    schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        image: { type: "string" },
        file: { type: "string", format: "binary" },
        category_id: { type: "string" },
        price_USD: { type: "number" },
        discount_price_USD: { type: "number" },
      },
    },
  })
  async updateService(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() data: UpdateServiceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.crudService.update(id, data, file);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Удаление услуги" })
  @ApiResponse({ status: 200, description: "Услуга успешно удалена" })
  @ApiResponse({ status: 400, description: "Некорректный id услуги" })
  @ApiResponse({ status: 403, description: "Доступ запрещен" })
  @ApiResponse({ status: 404, description: "Услуга не найдена" })
  async deleteService(@Param("id", ParseUUIDPipe) id: string) {
    return this.crudService.delete(id);
  }
}
