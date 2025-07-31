import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "@lib/prisma";
import * as path from "path";
import * as fs from "fs";
import { ValidationService } from "./validation.service";
import { SyncService } from "./sync.service";
import {
  TranslationSyncResult,
  GlobalTranslationValidationStatus,
} from "../types";

@Injectable()
export class TranslationsService {
  private readonly translationsPath = path.join(process.cwd(), "translations");
  private readonly allowedModules = ["admin", "common", "public"];

  constructor(
    private readonly prisma: PrismaService,
    private readonly validationService: ValidationService,
    private readonly syncService: SyncService,
  ) {}

  /**
   * Получает объединенные переводы для использования в приложении
   */
  async getMessages(locale_symbol: string, modules: string[]): Promise<object> {
    await this.validateLocale(locale_symbol);

    const messages: object = {};

    for (const module of modules) {
      if (!this.allowedModules.includes(module)) continue; // Пропускаем неизвестные модули
      try {
        const moduleTranslations = await this.getTranslations(
          locale_symbol,
          module,
        );
        // Сохраняем переводы под ключом модуля
        messages[module] = moduleTranslations;
      } catch (error) {
        console.warn(
          `Не удалось загрузить переводы для модуля ${module}: ${String(error)}`,
        );
        // Продолжаем загрузку других модулей
      }
    }
    return messages;
  }

  /**
   * Получает переводы для указанной локали и модуля
   */
  async getTranslations(
    locale_symbol: string,
    module: string,
  ): Promise<object> {
    await this.validateParams(locale_symbol, module);

    const filePath = this.getFilePath(locale_symbol, module);

    if (!fs.existsSync(filePath))
      throw new NotFoundException(
        `Файл переводов не найден: ${locale_symbol}/${module}`,
      );

    try {
      return JSON.parse(fs.readFileSync(filePath, "utf8")) as object;
    } catch (error) {
      throw new BadRequestException(
        `Ошибка чтения файла переводов: ${String(error)}`,
      );
    }
  }

  /**
   * Обновляет переводы для указанной локали и модуля
   */
  async updateTranslations(
    locale_symbol: string,
    module: string,
    translations: object,
  ): Promise<{ success: boolean; message: string }> {
    await this.validateParams(locale_symbol, module);

    const filePath = this.getFilePath(locale_symbol, module);

    try {
      // Создаем резервную копию
      if (fs.existsSync(filePath))
        fs.copyFileSync(filePath, `${filePath}.backup.${Date.now()}`);

      // Записываем новые переводы
      fs.writeFileSync(filePath, JSON.stringify(translations, null, 2), "utf8");

      return {
        success: true,
        message: `Переводы для ${locale_symbol}/${module} успешно обновлены`,
      };
    } catch (error) {
      throw new BadRequestException(
        `Ошибка записи файла переводов: ${String(error)}`,
      );
    }
  }

  /**
   * Валидация параметров
   */
  private async validateParams(
    locale_symbol: string,
    module: string,
  ): Promise<void> {
    await this.validateLocale(locale_symbol);

    if (!this.allowedModules.includes(module))
      throw new BadRequestException(
        `Недопустимый модуль: ${module}. Разрешены: ${this.allowedModules.join(", ")}`,
      );
  }

  /**
   * Получает статус валидации всех файлов переводов
   */
  async getValidationStatus(): Promise<GlobalTranslationValidationStatus> {
    try {
      const locales = await this.prisma.locale.findMany({
        select: { symbol: true },
        where: { is_excluded: false },
      });

      if (!locales || locales.length === 0) {
        console.warn("Нет активных локализаций для валидации");
        return {
          locales: [],
          template_files: {},
          summary: {
            total_locales: 0,
            locales_with_issues: 0,
            missing_files: 0,
            total_missing_keys: 0,
            total_empty_values: 0,
          },
        };
      }

      const locale_symbols = locales.map((locale) => locale.symbol);
      return await this.validationService.validateAllLocales(locale_symbols);
    } catch (error) {
      console.error(`Ошибка при получении статуса валидации: ${String(error)}`);
      throw error;
    }
  }

  /**
   * Создает файлы переводов для новой локализации
   */
  async createLocaleFiles(
    locale_symbol: string,
  ): Promise<TranslationSyncResult> {
    await this.validateLocale(locale_symbol);
    return this.syncService.createTranslationFiles(locale_symbol);
  }

  /**
   * Удаляет файлы переводов для локализации
   */
  deleteLocaleFiles(locale_symbol: string): {
    deleted_files: string[];
    errors: string[];
  } {
    return this.syncService.deleteTranslationFiles(locale_symbol);
  }

  /**
   * Синхронизирует все файлы переводов с шаблонами
   */
  async syncAllTranslations(): Promise<TranslationSyncResult[]> {
    const locales = await this.prisma.locale.findMany({
      select: { symbol: true },
    });

    const locale_symbols = locales.map((locale) => locale.symbol.toLowerCase());

    return this.syncService.syncAllTranslations(locale_symbols);
  }

  /**
   * Восстанавливает структуру файла переводов
   */
  async repairTranslationFile(
    locale_symbol: string,
    module: string,
  ): Promise<boolean> {
    await this.validateParams(locale_symbol, module);
    return this.syncService.repairTranslationFile(locale_symbol, module);
  }

  /**
   * Получает список всех доступных локализаций
   */
  async getAvailableLocales(): Promise<string[]> {
    const locales = await this.prisma.locale.findMany({
      select: { symbol: true },
    });

    return locales.map((locale) => locale.symbol.toLowerCase());
  }

  /**
   * Валидация локали (проверяет существование в базе данных и активность)
   */
  private async validateLocale(locale_symbol: string): Promise<void> {
    if (locale_symbol.toLowerCase() === "main") return; // main всегда разрешен

    const locale = await this.prisma.locale.findFirst({
      where: {
        symbol: {
          equals: locale_symbol.toUpperCase(),
          mode: "insensitive",
        },
        is_excluded: false,
      },
    });

    if (!locale)
      throw new BadRequestException(
        `Локаль не найдена в базе данных или исключена: ${locale_symbol}`,
      );
  }

  /**
   * Получает путь к файлу переводов
   */
  private getFilePath(locale_symbol: string, module: string): string {
    const normalizedLocale = locale_symbol.toLowerCase();
    const fileName = `${module}.${normalizedLocale}.json`;
    return path.join(this.translationsPath, module, fileName);
  }
}
