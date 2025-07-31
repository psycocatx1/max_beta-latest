import {
  Controller,
  Get,
  UseGuards,
  Patch,
  Body,
  Query,
  Put,
  Req,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard, Roles, RolesGuard } from "@lib/common";
import { AdminUpdateUserDto, UpdateUserDto } from "./dto/update.dto";
import { UserFiltersDto } from "./dto/filters.dto";
import { Role, Prisma } from "@lib/prisma";
import { UsersListService, UsersCrudService } from "./services";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersListService: UsersListService,
    private readonly usersCrudService: UsersCrudService,
  ) {}

  @Get("find")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Получить пользователя по ID" })
  @ApiResponse({ status: 200, description: "Данные пользователя" })
  @ApiResponse({ status: 404, description: "Пользователь не найден" })
  async findOne(@Query() where: Prisma.UserWhereUniqueInput) {
    return this.usersCrudService.findOne(where);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Получить всех пользователей (только для администраторов)",
  })
  @ApiResponse({ status: 200, description: "Список пользователей" })
  async findAll(@Query() filters: UserFiltersDto) {
    return this.usersListService.findAll(filters);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Получить данные текущего пользователя" })
  @ApiResponse({ status: 200, description: "Данные пользователя" })
  async me(@Req() req: Request & { user: { id: string } }) {
    return this.usersCrudService.findOne({ id: req.user.id });
  }

  @Patch("")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Обновить данные пользователя" })
  @ApiResponse({ status: 200, description: "Пользователь обновлен" })
  @ApiResponse({ status: 404, description: "Пользователь не найден" })
  async update(
    @Query() where: Prisma.UserWhereUniqueInput,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersCrudService.update(where, updateUserDto);
  }

  @Put("")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Обновить данные пользователя" })
  @ApiResponse({ status: 200, description: "Пользователь обновлен" })
  @ApiResponse({ status: 404, description: "Пользователь не найден" })
  async adminUpdate(
    @Query() where: Prisma.UserWhereUniqueInput,
    @Body() updateUserDto: AdminUpdateUserDto,
  ) {
    return this.usersCrudService.update(where, updateUserDto);
  }
}
