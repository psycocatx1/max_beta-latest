import { Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import { TranslationSyncResult } from "../types";

interface TranslationObject {
  [key: string]: TranslationObject | string;
}

@Injectable()
export class SyncService {
  private readonly translationsPath = path.join(process.cwd(), "translations");
  private readonly templateModules = ["admin", "common", "public"];

  /**
   * Создает объект с той же структурой что и шаблон, но с префиксом #!restored для значений
   */
  private createEmptyTemplate(template: TranslationObject): TranslationObject {
    if (
      typeof template !== "object" ||
      template === null ||
      Array.isArray(template)
    )
      return {};

    const result: TranslationObject = {};
    for (const key in template) {
      if (Object.prototype.hasOwnProperty.call(template, key)) {
        const value = template[key];
        result[key] =
          typeof value === "object"
            ? this.createEmptyTemplate(value)
            : `#!restored "${value}"`;
      }
    }
    return result;
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

    if (!fs.existsSync(templatePath)) return null;

    try {
      const content = fs.readFileSync(templatePath, "utf8");
      return JSON.parse(content) as TranslationObject;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  /**
   * Сохраняет файл переводов
   */
  private saveTranslationFile(
    locale_symbol: string,
    module: string,
    data: TranslationObject,
  ): boolean {
    const filePath = path.join(
      this.translationsPath,
      module,
      `${module}.${locale_symbol.toLowerCase()}.json`,
    );
    const dirPath = path.dirname(filePath);
    try {
      // Создаем директорию если не существует
      if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
      // Создаем резервную копию если файл существует
      if (fs.existsSync(filePath))
        fs.copyFileSync(filePath, `${filePath}.backup.${Date.now()}`);
      // Сохраняем файл
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * Объединяет существующие переводы с шаблоном
   */
  private mergeWithTemplate(
    existing: TranslationObject | undefined | null,
    template: TranslationObject,
  ): TranslationObject {
    const result: TranslationObject = {};
    // Добавляем все ключи из шаблона
    for (const key in template) {
      if (Object.prototype.hasOwnProperty.call(template, key)) {
        const templateValue = template[key];
        const existingValue = existing?.[key];

        if (typeof templateValue === "object" && templateValue !== null) {
          result[key] = this.mergeWithTemplate(
            existingValue as TranslationObject | undefined,
            templateValue,
          );
        } else {
          // Если существующее значение есть и оно строка, используем его
          // Иначе используем значение из шаблона с префиксом #!restored
          result[key] = typeof existingValue === "string"
            ? existingValue
            : `#!restored "${templateValue}"`;
        }
      }
    }
    // Добавляем дополнительные ключи из существующего файла (избыточные ключи)
    if (existing && typeof existing === "object") {
      for (const key in existing) {
        if (
          Object.prototype.hasOwnProperty.call(existing, key) &&
          !Object.prototype.hasOwnProperty.call(template, key)
        )
          result[key] = existing[key];
      }
    }

    return result;
  }

  /**
   * Создает файлы переводов для новой локализации
   */
  createTranslationFiles(locale_symbol: string): TranslationSyncResult {
    const normalizedLocale = locale_symbol.toLowerCase();
    const result: TranslationSyncResult = {
      locale_symbol: normalizedLocale,
      created_files: [],
      updated_files: [],
      errors: [],
      success: true,
    };

    for (const module of this.templateModules) {
      try {
        const template = this.loadTemplateFile(module);

        if (!template) {
          const error = `Не удалось загрузить шаблон для модуля ${module}`;
          result.errors.push(error);
          result.success = false;
          continue;
        }

        const filePath = path.join(
          this.translationsPath,
          module,
          `${module}.${normalizedLocale}.json`,
        );
        let translations: TranslationObject;
        if (fs.existsSync(filePath)) {
          // Если файл существует, обновляем его структуру
          try {
            const existingContent = fs.readFileSync(filePath, "utf8");
            const existingTranslations = JSON.parse(
              existingContent,
            ) as TranslationObject;
            translations = this.mergeWithTemplate(
              existingTranslations,
              template,
            );
            result.updated_files.push(filePath);
          } catch (error) {
            console.error(error);
            // Если не удалось прочитать существующий файл, создаем новый
            translations = this.createEmptyTemplate(template);
            result.created_files.push(filePath);
          }
        } else {
          // Создаем новый файл с пустыми значениями
          translations = this.createEmptyTemplate(template);
          result.created_files.push(filePath);
        }

        const saved = this.saveTranslationFile(
          normalizedLocale,
          module,
          translations,
        );

        if (!saved) {
          const error = `Не удалось сохранить файл для модуля ${module}`;
          result.errors.push(error);
          result.success = false;
        }
      } catch (error) {
        const errorMsg = `Ошибка создания файла для модуля ${module}: ${error instanceof Error ? error.message : String(error)}`;
        result.errors.push(errorMsg);
        result.success = false;
        console.error(errorMsg);
      }
    }

    if (!result.success)
      console.error(
        `Ошибки при создании файлов переводов для локализации ${normalizedLocale}`,
      );

    return result;
  }

  /**
   * Синхронизирует все файлы переводов с шаблонами
   */
  syncAllTranslations(locale_symbols: string[]): TranslationSyncResult[] {
    const results: TranslationSyncResult[] = [];

    for (const locale_symbol of locale_symbols) {
      results.push(this.createTranslationFiles(locale_symbol));
    }
    return results;
  }

  /**
   * Удаляет файлы переводов для локализации
   */
  deleteTranslationFiles(locale_symbol: string): {
    deleted_files: string[];
    errors: string[];
  } {
    const deleted_files: string[] = [];
    const errors: string[] = [];

    for (const module of this.templateModules) {
      const filePath = path.join(
        this.translationsPath,
        module,
        `${module}.${locale_symbol.toLowerCase()}.json`,
      );

      if (fs.existsSync(filePath)) {
        try {
          // Создаем резервную копию перед удалением
          const backupPath = `${filePath}.deleted.${Date.now()}`;
          fs.copyFileSync(filePath, backupPath);

          fs.unlinkSync(filePath);
          deleted_files.push(filePath);
        } catch (error) {
          const errorMsg = `Ошибка удаления файла ${filePath}: ${error instanceof Error ? error.message : String(error)}`;
          errors.push(errorMsg);
          console.error(errorMsg);
        }
      }
    }

    return { deleted_files, errors };
  }

  /**
   * Восстанавливает структуру файла переводов по шаблону
   */
  repairTranslationFile(locale_symbol: string, module: string): boolean {
    try {
      const template = this.loadTemplateFile(module);
      if (!template) return false;
      const filePath = path.join(
        this.translationsPath,
        module,
        `${module}.${locale_symbol.toLowerCase()}.json`,
      );
      let existing: TranslationObject = {};
      // Пытаемся загрузить существующий файл
      if (fs.existsSync(filePath)) {
        try {
          const content = fs.readFileSync(filePath, "utf8");
          existing = JSON.parse(content) as TranslationObject;
        } catch (error) {
          console.error(
            `Не удалось прочитать существующий файл ${filePath}, создаем новый`,
            error instanceof Error ? error.message : String(error),
          );
        }
      }

      const repaired = this.mergeWithTemplate(existing, template);
      return this.saveTranslationFile(
        locale_symbol.toLowerCase(),
        module,
        repaired,
      );
    } catch (error) {
      console.error(
        `Ошибка восстановления файла ${locale_symbol}/${module}: ${error instanceof Error ? error.message : String(error)}`,
      );
      return false;
    }
  }
}
