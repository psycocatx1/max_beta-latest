import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  Param,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseUUIDPipe,
} from "@nestjs/common";
import { CrudService, ListService, ValidationService } from "./services";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConsumes,
  ApiBody,
} from "@nestjs/swagger";
import { CreateLocaleDto, LocaleFiltersDto, UpdateLocaleDto } from "./dto";
import { Role, BaseListResult, Locale } from "@lib/prisma";
import {
  ImageUploadInterceptor,
  JwtAuthGuard,
  Roles,
  RolesGuard,
} from "@lib/common";
import { example_locale, example_locales_list_result } from "./example.data";

@ApiTags("Locales")
@Controller("locales")
@ApiResponse({ status: 400, description: "Bad Request" })
@ApiResponse({ status: 401, description: "Unauthorized" })
@ApiResponse({ status: 403, description: "Forbidden" })
@ApiResponse({ status: 404, description: "Not Found" })
@ApiResponse({ status: 500, description: "Internal Server Error" })
export class LocalesController {
  constructor(
    private readonly crudService: CrudService,
    private readonly listService: ListService,
    private readonly validationService: ValidationService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ImageUploadInterceptor)
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Создание локализации" })
  @ApiBody({
    description: "Данные локализации с изображением",
    schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        language: { type: "string" },
        symbol: { type: "string" },
        currency: { type: "string" },
        currency_symbol: { type: "string" },
        phone_code: { type: "string" },
        image: { type: "string" },
        file: { type: "string", format: "binary" },
      },
      required: [
        "name",
        "language",
        "symbol",
        "currency",
        "currency_symbol",
        "phone_code",
      ],
    },
  })
  @ApiResponse({
    status: 201,
    description: "Локализация успешно создана",
    example: example_locale,
  })
  async create(
    @Body() data: CreateLocaleDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Locale> {
    return await this.crudService.create(data, file);
  }

  @Get(":id")
  @ApiOperation({ summary: "Получение локализации по id" })
  @ApiResponse({
    status: 200,
    description: "Локализация",
    example: example_locale,
  })
  async find(@Param("id", ParseUUIDPipe) id: string): Promise<Locale> {
    return this.crudService.findOne({ id });
  }

  @Get()
  @ApiOperation({ summary: "Получение всех локализаций" })
  @ApiResponse({
    status: 200,
    description: "Список локализаций",
    example: example_locales_list_result,
  })
  async findAll(
    @Query() dto: LocaleFiltersDto,
  ): Promise<BaseListResult<Locale>> {
    return this.listService.findAll(dto);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ImageUploadInterceptor)
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Обновление локализации" })
  @ApiBody({
    description: "Данные локализации с файлом иконки или URL",
    schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        language: { type: "string" },
        symbol: { type: "string" },
        currency: { type: "string" },
        currency_symbol: { type: "string" },
        phone_code: { type: "string" },
        image: { type: "string" },
        file: { type: "string", format: "binary" },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "Локализация обновлена",
    example: example_locale,
  })
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() data: UpdateLocaleDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Locale> {
    return await this.crudService.update({ id }, data, file);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Удаление локализации" })
  @ApiResponse({
    status: 200,
    description: "Локализация удалена",
    example: example_locale,
  })
  async delete(@Param("id", ParseUUIDPipe) id: string): Promise<Locale> {
    return await this.crudService.delete({ id });
  }

  @Get("validation/entities")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Проверка всех локализаций" })
  async validateEntities() {
    return await this.validationService.validateAllEntities();
  }
}
