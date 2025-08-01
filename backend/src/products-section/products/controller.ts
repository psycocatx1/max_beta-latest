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
import { ProductFiltersDto } from "./dto/filters.dto";
import { CrudService } from "./services/crud.service";
import { ListService } from "./services/list.service";
import { ApiOperation, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { example_product, example_product_list_result } from "./example.data";
import { CreateProductDto, UpdateProductDto } from "./dto";
import {
  Roles,
  JwtAuthGuard,
  RolesGuard,
  ImageUploadInterceptor,
} from "@lib/common";
import { Role } from "@lib/prisma";
/**
 * Контроллер для продуктов
 */
@Controller("products")
export class ProductsController {
  constructor(
    private readonly listService: ListService,
    private readonly crudService: CrudService,
  ) { }

  @Get()
  @ApiResponse({
    status: 200,
    description: "Список продуктов успешно получен",
    example: example_product_list_result,
  })
  @ApiOperation({
    summary: "Получение списка продуктов с пагинацией и сортировкой",
  })
  async getProducts(@Query() filters: ProductFiltersDto) {
    return this.listService.getProducts(filters);
  }

  @Get(":id")
  @ApiOperation({ summary: "Получение продукта по id" })
  @ApiResponse({
    status: 200,
    description: "Продукт успешно получен",
    example: example_product,
  })
  @ApiResponse({ status: 404, description: "Продукт не найден" })
  @ApiResponse({ status: 400, description: "Некорректный id продукта" })
  @ApiResponse({ status: 403, description: "Доступ запрещен" })
  async getProduct(
    @Param("id", ParseUUIDPipe) id: string,
    @Query("locale_id", new ParseUUIDPipe({ optional: true })) locale_id?: string,
  ) {
    return this.crudService.findOne(id, locale_id);
  }

  @Get(":id/:locale_id")
  @ApiOperation({
    summary: "Получение локализованного продукта по id и locale_id",
  })
  @ApiResponse({
    status: 200,
    description: "Продукт успешно получен",
    example: example_product,
  })
  @ApiResponse({
    status: 400,
    description: "Некорректный id или locale_id продукта",
  })
  @ApiResponse({ status: 404, description: "Продукт не найден" })
  async getProductByLocale(
    @Param("id", ParseUUIDPipe) id: string,
    @Param("locale_id", new ParseUUIDPipe({ optional: true })) locale_id?: string,
  ) {
    return this.crudService.findOne(id, locale_id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ImageUploadInterceptor)
  @ApiOperation({ summary: "Создание продукта" })
  @ApiResponse({
    status: 201,
    description: "Продукт успешно создан",
    example: example_product,
  })
  @ApiResponse({ status: 400, description: "Некорректные данные" })
  @ApiResponse({ status: 403, description: "Доступ запрещен" })
  @ApiQuery({
    description: "Данные для создания продукта",
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
  async createProduct(
    @Body() data: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.crudService.create(data, file);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ImageUploadInterceptor)
  @ApiOperation({ summary: "Обновление продукта" })
  @ApiResponse({
    status: 200,
    description: "Продукт успешно обновлен",
    example: example_product,
  })
  @ApiResponse({ status: 400, description: "Некорректные данные" })
  @ApiResponse({ status: 403, description: "Доступ запрещен" })
  @ApiResponse({ status: 404, description: "Продукт не найден" })
  @ApiQuery({
    description: "Данные для обновления продукта",
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
  async updateProduct(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() data: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.crudService.update(id, data, file);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(":id")
  @ApiOperation({ summary: "Удаление продукта" })
  @ApiResponse({ status: 200, description: "Продукт успешно удален" })
  @ApiResponse({ status: 400, description: "Некорректный id продукта" })
  @ApiResponse({ status: 403, description: "Доступ запрещен" })
  @ApiResponse({ status: 404, description: "Продукт не найден" })
  async deleteProduct(@Param("id", ParseUUIDPipe) id: string) {
    return this.crudService.delete(id);
  }
}
