import { CrudService, ListService } from "./services";
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
import {
  CreateLocalServiceDto,
  LocalServiceFiltersDto,
  UpdateLocalServiceDto,
} from "./dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  example_local_services_list_result,
  example_extended_local_service,
} from "./example.data";
import { JwtAuthGuard, RolesGuard, Roles } from "@lib/common";
import { Role } from "@lib/prisma";

@ApiTags("Local Services")
@Controller("local-services")
@ApiResponse({ status: 400, description: "Bad Request" })
@ApiResponse({ status: 401, description: "Unauthorized" })
@ApiResponse({ status: 404, description: "Not Found" })
export class LocalServicesController {
  constructor(
    private readonly listService: ListService,
    private readonly crudService: CrudService,
  ) {}

  @Get()
  @ApiOperation({ summary: "Получение списка локализаций услуги" })
  @ApiResponse({
    status: 200,
    description: "Список локализаций услуги",
    example: example_local_services_list_result,
  })
  async getList(@Query() filterDto: LocalServiceFiltersDto) {
    return this.listService.getList(filterDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Получение локализации услуги по id" })
  @ApiResponse({
    status: 200,
    description: "Локализация услуги",
    example: example_extended_local_service,
  })
  async getOne(@Param("id") id: string) {
    return this.crudService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Создание локализации услуги" })
  @ApiResponse({
    status: 201,
    description: "Локализация услуги создана",
    example: example_extended_local_service,
  })
  async create(@Body() createDto: CreateLocalServiceDto) {
    return this.crudService.create(createDto);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Обновление локализации услуги" })
  @ApiResponse({
    status: 200,
    description: "Локализация услуги обновлена",
    example: example_extended_local_service,
  })
  async update(
    @Param("id") id: string,
    @Body() updateDto: UpdateLocalServiceDto,
  ) {
    return this.crudService.update(id, updateDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Удаление локализации услуги" })
  @ApiResponse({ status: 200, description: "Локализация услуги удалена" })
  async delete(@Param("id") id: string) {
    return this.crudService.delete(id);
  }
}
