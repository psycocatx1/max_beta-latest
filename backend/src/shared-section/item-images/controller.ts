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
import { ItemImagesFiltersDto } from "./dto/filters.dto";
import { CrudService } from "./services/crud.service";
import { ListService } from "./services/list.service";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  example_item_image,
  example_item_images_list_result,
} from "./example.data";
import { CreateItemImageDto, UpdateItemImageDto } from "./dto";
import {
  Roles,
  JwtAuthGuard,
  RolesGuard,
  ImageUploadInterceptor,
} from "@lib/common";
import { Role } from "@lib/prisma";

/**
 * Контроллер для картинок объектов
 */
@ApiTags("Картинки объектов")
@Controller("item-images")
@ApiResponse({ status: 400, description: "Некорректные данные" })
@ApiResponse({ status: 401, description: "Неавторизованный пользователь" })
@ApiResponse({ status: 403, description: "Доступ запрещен" })
@ApiResponse({ status: 404, description: "Картинка объекта не найдена" })
export class ItemImagesController {
  constructor(
    private readonly listService: ListService,
    private readonly crudService: CrudService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: "Список картинок объектов успешно получен",
    example: example_item_images_list_result,
  })
  @ApiOperation({
    summary: "Получение списка картинок объектов с пагинацией и сортировкой",
  })
  async getItemImages(@Query() filters: ItemImagesFiltersDto) {
    return this.listService.getItemImages(filters);
  }

  @Get(":id")
  @ApiOperation({ summary: "Получение картинки объекта по id" })
  @ApiResponse({
    status: 200,
    description: "Картинка объекта успешно получена",
    example: example_item_image,
  })
  async getItemImage(@Param("id", ParseUUIDPipe) id: string) {
    return this.crudService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ImageUploadInterceptor)
  @ApiOperation({ summary: "Создание картинки объекта" })
  @ApiResponse({
    status: 201,
    description: "Картинка объекта успешно создана",
    example: example_item_image,
  })
  @ApiQuery({
    description: "Данные для создания картинки объекта",
    schema: {
      type: "object",
      properties: {
        image: { type: "string" },
        file: { type: "string", format: "binary" },
        product_id: { type: "string" },
        service_id: { type: "string" },
        is_excluded: { type: "boolean" },
      },
      required: ["image"],
    },
  })
  async createItemImage(
    @Body() data: CreateItemImageDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.crudService.create(data, file);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ImageUploadInterceptor)
  @ApiOperation({ summary: "Обновление картинки объекта" })
  @ApiResponse({
    status: 200,
    description: "Картинка объекта успешно обновлена",
    example: example_item_image,
  })
  @ApiQuery({
    description: "Данные для обновления картинки объекта",
    schema: {
      type: "object",
      properties: {
        image: { type: "string" },
        file: { type: "string", format: "binary" },
        product_id: { type: "string" },
        service_id: { type: "string" },
        is_excluded: { type: "boolean" },
      },
    },
  })
  async updateItemImage(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() data: UpdateItemImageDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.crudService.update(id, data, file);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Удаление картинки объекта" })
  @ApiResponse({ status: 200, description: "Картинка объекта успешно удалена" })
  async deleteItemImage(@Param("id", ParseUUIDPipe) id: string) {
    return this.crudService.delete(id);
  }
}
