import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from "@nestjs/common";
import { CrudService, ListService } from "./services";
import {
  CreateLocalCategoryDto,
  UpdateLocalCategoryDto,
  LocalCategoryFiltersDto,
} from "./dto";
import { Roles, JwtAuthGuard, RolesGuard } from "@lib/common";
import { Role } from "@lib/prisma";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  example_local_categories_list_result,
  example_local_category,
} from "./example.data";

@ApiTags("Local Categories")
@Controller("local-categories")
@ApiResponse({ status: 400, description: "Bad Request" })
@ApiResponse({ status: 401, description: "Unauthorized" })
@ApiResponse({ status: 403, description: "Forbidden" })
@ApiResponse({ status: 404, description: "Not Found" })
export class LocalCategoriesController {
  constructor(
    private readonly crudService: CrudService,
    private readonly listService: ListService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Создание локализации категории" })
  @ApiResponse({
    status: 201,
    description: "Локализация категории успешно создана",
    example: example_local_category,
  })
  async create(@Body() createLocalCategoryDto: CreateLocalCategoryDto) {
    return await this.crudService.create(createLocalCategoryDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: "Локализации категорий успешно получены",
    example: example_local_categories_list_result,
  })
  async findAll(@Query() filterDto: LocalCategoryFiltersDto) {
    return await this.listService.findAll(filterDto);
  }

  @Get(":id")
  @ApiResponse({
    status: 200,
    description: "Локализация категории успешно получена",
    example: example_local_category,
  })
  async findOne(@Param("id") id: string) {
    return await this.crudService.findOne(id);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiResponse({
    status: 200,
    description: "Локализация категории успешно обновлена",
    example: example_local_category,
  })
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() data: UpdateLocalCategoryDto,
  ) {
    return await this.crudService.update(id, data);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiResponse({
    status: 200,
    description: "Локализация категории успешно удалена",
    example: example_local_category,
  })
  async delete(@Param("id") id: string) {
    return await this.crudService.delete(id);
  }
}
