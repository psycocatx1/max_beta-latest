import { CrudService } from "./services";
import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ListService } from "./services";
import {
  CreateLocalProductDto,
  LocalProductFiltersDto,
  UpdateLocalProductDto,
} from "./dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  example_local_products_list_result,
  example_extended_local_product,
} from "./example.data";
import { JwtAuthGuard, RolesGuard, Roles } from "@lib/common";
import { Role } from "@lib/prisma";

@ApiTags("Local Products")
@Controller("local-products")
@ApiResponse({ status: 400, description: "Bad Request" })
@ApiResponse({ status: 401, description: "Unauthorized" })
@ApiResponse({ status: 404, description: "Not Found" })
export class LocalProductsController {
  constructor(
    private readonly listService: ListService,
    private readonly crudService: CrudService,
  ) {}

  @Get()
  @ApiOperation({ summary: "Получение списка локализаций продукта" })
  @ApiResponse({
    status: 200,
    description: "Список локализаций продукта",
    example: example_local_products_list_result,
  })
  async getList(@Query() filterDto: LocalProductFiltersDto) {
    return this.listService.getList(filterDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Получение локализации продукта по id" })
  @ApiResponse({
    status: 200,
    description: "Локализация продукта",
    example: example_extended_local_product,
  })
  async getOne(@Param("id") id: string) {
    return this.crudService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Создание локализации продукта" })
  @ApiResponse({
    status: 201,
    description: "Локализация продукта создана",
    example: example_extended_local_product,
  })
  async create(@Body() createDto: CreateLocalProductDto) {
    return this.crudService.create(createDto);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Обновление локализации продукта" })
  @ApiResponse({
    status: 200,
    description: "Локализация продукта обновлена",
    example: example_extended_local_product,
  })
  async update(
    @Param("id") id: string,
    @Body() updateDto: UpdateLocalProductDto,
  ) {
    return this.crudService.update(id, updateDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Удаление локализации продукта" })
  @ApiResponse({ status: 200, description: "Локализация продукта удалена" })
  async delete(@Param("id") id: string) {
    return this.crudService.delete(id);
  }
}
