import { api, formatQueryPath } from '@lib/api';
import {
  UpdateTranslationDto,
  TranslationResponse,
  TranslationModuleType,
  GlobalTranslationValidationStatus,
  TranslationSyncResult
} from '../types/translations.types';
import { NestedRecord } from '@/components/admin/common/JsonEditor/useJsonEditor';

/**
 * API для работы с переводами
 */
export class TranslationsApi {
  private static readonly ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/translations`;

  private static readonly TRANSLATIONS_PATHS = {
    getMessages: (locale_symbol: string, modules?: TranslationModuleType[]) => formatQueryPath(`${this.ENDPOINT}/messages/${locale_symbol}`, { modules }),
    get: (locale_symbol: string, module: TranslationModuleType) => `${this.ENDPOINT}/${locale_symbol}/${module}`,
    update: (locale_symbol: string, module: TranslationModuleType) => `${this.ENDPOINT}/${locale_symbol}/${module}`,
    getValidationStatus: `${this.ENDPOINT}/validation/status`,
    syncAllTranslations: `${this.ENDPOINT}/sync/all`,
    createLocaleFiles: (locale_symbol: string) => `${this.ENDPOINT}/sync/${locale_symbol}`,
    repairTranslationFile: (locale_symbol: string, module: TranslationModuleType) => `${this.ENDPOINT}/repair/${locale_symbol}/${module}`,
  } as const;
  /**
   * Получает объединенные переводы для использования в приложении
   */
  static async getMessages(locale_symbol: string, modules?: TranslationModuleType[]) {
    return await api.get<NestedRecord>(this.TRANSLATIONS_PATHS.getMessages(locale_symbol, modules));
  }
  /**
   * Получает переводы для указанной локали и модуля (для редактирования)
   */
  static async get(locale_symbol: string, module: TranslationModuleType) {
    return await api.get<NestedRecord>(this.TRANSLATIONS_PATHS.get(locale_symbol, module));
  }
  /**
   * Обновляет переводы для указанной локали и модуля
   */
  static async update(locale_symbol: string, module: TranslationModuleType, data: UpdateTranslationDto) {
    return await api.put<TranslationResponse>(this.TRANSLATIONS_PATHS.update(locale_symbol, module), data);
  }
  /**
   * Получает статус валидации всех файлов переводов
   */
  static async getValidationStatus() {
    return await api.get<GlobalTranslationValidationStatus>(this.TRANSLATIONS_PATHS.getValidationStatus);
  }
  /**
   * Синхронизирует все файлы переводов с шаблонами
   */
  static async syncAllTranslations() {
    return await api.post<TranslationSyncResult[]>(this.TRANSLATIONS_PATHS.syncAllTranslations);
  }
  /**
   * Создает файлы переводов для локализации
   */
  static async createLocaleFiles(locale_symbol: string) {
    return await api.post<TranslationSyncResult>(this.TRANSLATIONS_PATHS.createLocaleFiles(locale_symbol));
  }
  /**
   * Восстанавливает структуру файла переводов
   */
  static async repairTranslationFile(locale_symbol: string, module: TranslationModuleType) {
    return await api.post<{ success: boolean; message: string }>(this.TRANSLATIONS_PATHS.repairTranslationFile(locale_symbol, module));
  }
} 