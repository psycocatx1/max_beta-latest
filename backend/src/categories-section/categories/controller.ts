import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
} from "@nestjs/common";
import { CrudService, ListService } from "./services";
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryFiltersDto,
} from "./dto";
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from "@nestjs/swagger";
import {
  example_categories_list_result,
  example_category,
  example_extended_category,
} from "./example.data";
import {
  Roles,
  JwtAuthGuard,
  RolesGuard,
  ImageUploadInterceptor,
} from "@lib/common";
import { Role } from "@lib/prisma";

@ApiTags("Categories")
@Controller("categories")
@ApiResponse({ status: 400, description: "Bad Request" })
@ApiResponse({ status: 401, description: "Unauthorized" })
@ApiResponse({ status: 403, description: "Forbidden" })
@ApiResponse({ status: 404, description: "Not Found" })
export class CategoriesController {
  constructor(
    private readonly crudService: CrudService,
    private readonly listService: ListService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ImageUploadInterceptor)
  @ApiOperation({ summary: "Создание категории" })
  @ApiResponse({
    status: 201,
    description: "Категория успешно создана",
    example: example_category,
  })
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return await this.crudService.create(createCategoryDto, file);
  }

  @Get()
  @ApiOperation({
    summary: "Получение списка категорий в виде дерева с локализацией",
  })
  @ApiResponse({
    status: 200,
    description: "Дерево категорий успешно получено",
    example: example_categories_list_result,
  })
  @ApiQuery({
    name: "locale_id",
    required: false,
    description: "ID локализации",
  })
  async findAll(@Query() filterDto: CategoryFiltersDto) {
    return await this.listService.findAll(filterDto);
  }

  @Get(":id")
  @ApiOperation({
    summary:
      "Получение категории с деревом предков и потомков, продуктами и услугами",
  })
  @ApiResponse({
    status: 200,
    description: "Категория успешно получена",
    example: example_extended_category,
  })
  @ApiQuery({
    name: "locale_id",
    required: false,
    description: "ID локализации",
  })
  async findOne(
    @Param("id", ParseUUIDPipe) id: string,
    @Query("locale_id", new ParseUUIDPipe({ optional: true }))
    locale_id?: string,
  ) {
    return await this.crudService.findOne(id, locale_id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ImageUploadInterceptor)
  @ApiOperation({ summary: "Обновление категории" })
  @ApiResponse({
    status: 200,
    description: "Категория успешно обновлена",
    example: example_extended_category,
  })
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return await this.crudService.update(id, updateCategoryDto, file);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Отметить категорию как удаленную" })
  @ApiResponse({
    status: 200,
    description: "Категория отмечена как удаленная",
    example: example_category,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async delete(@Param("id", ParseUUIDPipe) id: string) {
    return await this.crudService.delete(id);
  }
}
