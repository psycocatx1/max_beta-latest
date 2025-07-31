import { Injectable, NotFoundException } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import {
  TranslationValidationResult,
  TranslationValidationStatus,
  GlobalTranslationValidationStatus,
} from "../types";
import { PrismaService } from "@lib/prisma";

interface TranslationObject {
  [key: string]: string | TranslationObject | undefined;
}

@Injectable()
export class ValidationService {
  private readonly translationsPath = path.join(process.cwd(), "translations");
  private readonly templateModules = ["admin", "common", "public"];

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Получает все ключи из объекта рекурсивно
   */
  private getAllKeys(obj: TranslationObject, prefix: string = ""): string[] {
    const keys: string[] = [];

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        const value = obj[key];
        if (value && typeof value === "object" && !Array.isArray(value)) {
          keys.push(...this.getAllKeys(value, fullKey));
        } else {
          keys.push(fullKey);
        }
      }
    }
    return keys;
  }

  /**
   * Получает значение по пути ключа
   * @param obj - Объект с переводами
   * @param keyPath - Путь к значению в формате "key1.key2.key3"
   * @returns Значение по указанному пути или undefined, если путь не существует
   */
  private getValueByPath(
    obj: TranslationObject,
    keyPath: string,
  ): string | undefined {
    return keyPath
      .split(".")
      .reduce<unknown>((current: unknown, key: string): unknown => {
        if (current && typeof current === "object") {
          const currentObj = current as TranslationObject;
          const value = currentObj[key];

          // Если это последний ключ в пути, возвращаем значение как строку или undefined
          if (typeof value === "string" || value === undefined) {
            return value;
          }
          // Если это промежуточный объект, продолжаем навигацию
          return value;
        }
        return undefined;
      }, obj) as string | undefined;
  }

  /**
   * Проверяет является ли значение пустым
   */
  private isEmptyValue(value: unknown): boolean {
    return value === "" || value === null || value === undefined;
  }

  /**
   * Загружает шаблонный файл
   */
  private loadTemplateFile(module: string): TranslationObject | null {
    const templatePath = path.join(
      this.translationsPath,
      module,
      `${module}.main.json`,
    );

    try {
      return JSON.parse(
        fs.readFileSync(templatePath, "utf8"),
      ) as TranslationObject;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Загружает файл переводов
   */
  private loadTranslationFile(
    locale_symbol: string,
    module: string,
  ): TranslationObject | null {
    const filePath = path.join(
      this.translationsPath,
      module,
      `${module}.${locale_symbol.toLowerCase()}.json`,
    );

    try {
      return JSON.parse(fs.readFileSync(filePath, "utf8")) as TranslationObject;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Валидирует один файл переводов
   */
  validateTranslationFile(
    locale_symbol: string,
    module: string,
  ): TranslationValidationResult {
    const filePath = path.join(
      this.translationsPath,
      module,
      `${module}.${locale_symbol.toLowerCase()}.json`,
    );
    const exists = fs.existsSync(filePath);

    const result: TranslationValidationResult = {
      file_path: filePath,
      exists,
      missing_keys: [],
      empty_values: [],
      extra_keys: [],
      is_valid: true,
    };

    if (!exists) {
      result.is_valid = false;
      return result;
    }

    const template = this.loadTemplateFile(module);
    const translation = this.loadTranslationFile(locale_symbol, module);

    if (!template || !translation) {
      result.is_valid = false;
      return result;
    }

    const templateKeys = this.getAllKeys(template);
    const translationKeys = this.getAllKeys(translation);

    // Проверяем отсутствующие ключи
    for (const key of templateKeys) {
      if (!translationKeys.includes(key)) result.missing_keys.push(key);
    }

    // Проверяем пустые значения
    for (const key of templateKeys) {
      const value = this.getValueByPath(translation, key);
      if (this.isEmptyValue(value)) result.empty_values.push(key);
    }

    // Проверяем избыточные ключи (допустимы, но фиксируем)
    for (const key of translationKeys) {
      if (!templateKeys.includes(key)) result.extra_keys.push(key);
    }

    result.is_valid = result.missing_keys.length === 0;

    return result;
  }

  /**
   * Валидирует все файлы переводов для локализации
   */
  async validateLocale(
    locale_symbol: string,
  ): Promise<TranslationValidationStatus> {
    const locale = await this.prisma.locale.findFirst({
      where: {
        symbol: {
          equals: locale_symbol,
          mode: "insensitive",
        },
        is_excluded: false,
      },
    });

    if (!locale)
      throw new NotFoundException(
        `Locale not found or excluded: ${locale_symbol}`,
      );

    const status: TranslationValidationStatus = {
      locale: locale,
      modules: {},
      total_issues: 0,
      is_valid: true,
    };

    for (const module of this.templateModules) {
      const moduleResult = this.validateTranslationFile(locale_symbol, module);
      status.modules[module] = moduleResult;

      // Подсчитываем проблемы для модуля
      const moduleIssues =
        moduleResult.missing_keys.length +
        moduleResult.empty_values.length +
        (moduleResult.exists ? 0 : 1);

      status.total_issues += moduleIssues;

      if (!moduleResult.is_valid) {
        status.is_valid = false;
      }
    }

    return status;
  }

  /**
   * Валидирует все локализации
   */
  async validateAllLocales(
    locale_symbols: string[],
  ): Promise<GlobalTranslationValidationStatus> {
    // Получаем только активные локали из базы данных
    const activeLocales = await this.prisma.locale.findMany({
      where: {
        symbol: {
          in: locale_symbols,
          mode: "insensitive",
        },
        is_excluded: false,
      },
      select: { symbol: true },
    });

    const activeSymbols = activeLocales.map((locale) => locale.symbol);

    const status: GlobalTranslationValidationStatus = {
      locales: [],
      template_files: {},
      summary: {
        total_locales: activeSymbols.length,
        locales_with_issues: 0,
        missing_files: 0,
        total_missing_keys: 0,
        total_empty_values: 0,
      },
    };

    // Проверяем шаблонные файлы
    for (const module of this.templateModules) {
      const template = this.loadTemplateFile(module);
      status.template_files[module] = {
        exists: template !== null,
        keys_count: template ? this.getAllKeys(template).length : 0,
      };
    }

    // Проверяем каждую активную локализацию
    for (const locale_symbol of activeSymbols) {
      try {
        const localeStatus = await this.validateLocale(locale_symbol);
        status.locales.push(localeStatus);

        if (!localeStatus.is_valid) status.summary.locales_with_issues++;

        // Подсчитываем общую статистику
        for (const moduleResult of Object.values(localeStatus.modules)) {
          if (!moduleResult.exists) status.summary.missing_files++;
          status.summary.total_missing_keys += moduleResult.missing_keys.length;
          status.summary.total_empty_values += moduleResult.empty_values.length;
        }
      } catch (error) {
        console.error(error);
        // Пропускаем проблемную локализацию, но продолжаем валидацию остальных
        status.summary.total_locales--; // Уменьшаем счетчик так как локализация не обработана
      }
    }

    return status;
  }

  /**
   * Получает список всех доступных локализаций из файловой системы
   */
  getAvailableLocales(): string[] {
    const locales = new Set<string>();

    for (const module of this.templateModules) {
      const modulePath = path.join(this.translationsPath, module);

      if (fs.existsSync(modulePath)) {
        const files = fs.readdirSync(modulePath);

        for (const file of files) {
          const match = file.match(/^[^.]+\.([^.]+)\.json$/);
          if (match && match[1] !== "main") {
            locales.add(match[1]);
          }
        }
      }
    }

    return Array.from(locales);
  }
}
