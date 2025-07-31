import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger";
import { JwtAuthGuard, RolesGuard, Roles } from "@lib/common";
import { Role } from "@prisma/client";
import { TranslationsService } from "./services";
import { UpdateTranslationDto } from "./dto";

@ApiTags("Translations")
@Controller("translations")
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Get("validation/status")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Получить статус валидации всех файлов переводов" })
  @ApiResponse({ status: 200, description: "Статус валидации получен" })
  async getValidationStatus() {
    return this.translationsService.getValidationStatus();
  }

  @Post("sync/all")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Синхронизировать все файлы переводов с шаблонами" })
  @ApiResponse({ status: 200, description: "Синхронизация завершена" })
  async syncAllTranslations() {
    return this.translationsService.syncAllTranslations();
  }

  @Post("sync/:locale_symbol")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Создать файлы переводов для локализации" })
  @ApiParam({ name: "locale_symbol", description: "Символ локализации" })
  @ApiResponse({ status: 200, description: "Файлы переводов созданы" })
  async createLocaleFiles(@Param("locale_symbol") locale_symbol: string) {
    return this.translationsService.createLocaleFiles(locale_symbol);
  }

  @Post("repair/:locale_symbol/:module")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: "Восстановить структуру файла переводов" })
  @ApiParam({ name: "locale_symbol", description: "Символ локализации" })
  @ApiParam({ name: "module", description: "Модуль переводов" })
  @ApiResponse({ status: 200, description: "Файл восстановлен" })
  async repairTranslationFile(
    @Param("locale_symbol") locale_symbol: string,
    @Param("module") module: string,
  ) {
    const success = await this.translationsService.repairTranslationFile(
      locale_symbol,
      module,
    );
    return {
      success,
      message: success
        ? "Файл успешно восстановлен"
        : "Ошибка восстановления файла",
    };
  }

  @Get("messages/:locale_symbol")
  @ApiOperation({ summary: "Получить переводы для использования в приложении" })
  @ApiParam({ name: "locale_symbol", description: "Символ локализации" })
  @ApiQuery({
    name: "modules",
    description: "Список модулей через запятую",
    required: false,
  })
  async getMessages(
    @Param("locale_symbol") locale_symbol: string,
    @Query("modules") modules?: string,
  ) {
    const moduleList = modules
      ? modules.split(",")
      : ["common", "admin", "public"];
    return this.translationsService.getMessages(locale_symbol, moduleList);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put(":locale_symbol/:module")
  @ApiOperation({ summary: "Обновить переводы" })
  @ApiParam({ name: "locale_symbol", description: "Символ локализации" })
  @ApiParam({ name: "module", description: "Модуль переводов" })
  async updateTranslations(
    @Param("locale_symbol") locale_symbol: string,
    @Param("module") module: string,
    @Body() data: UpdateTranslationDto,
  ) {
    return this.translationsService.updateTranslations(
      locale_symbol,
      module,
      data.translations,
    );
  }

  // Этот маршрут должен быть ПОСЛЕДНИМ, так как он самый общий
  @Get(":locale_symbol/:module")
  @ApiOperation({ summary: "Получить переводы для редактирования" })
  @ApiParam({ name: "locale_symbol", description: "Символ локализации" })
  @ApiParam({ name: "module", description: "Модуль переводов" })
  async getTranslations(
    @Param("locale_symbol") locale_symbol: string,
    @Param("module") module: string,
  ) {
    return this.translationsService.getTranslations(locale_symbol, module);
  }
}
