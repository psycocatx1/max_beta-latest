import { api, createFormData, AxiosResponse, BaseListResult, formatQueryPath } from '@lib/api';
import { Locale, LocaleFiltersDto, CreateLocaleFormData, UpdateLocaleFormData, EntitiesValidationResult } from "../types/locales.types";


/**
 * API для работы с регионами
 */
export class LocalesApi {
  private static readonly ENDPOINT = '/locales';

  private static readonly LOCALES_PATHS = {
    get: (filters: LocaleFiltersDto) => formatQueryPath(this.ENDPOINT, filters),
    find: (id: string) => `${this.ENDPOINT}/${id}`,
    update: (id: string) => `${this.ENDPOINT}/${id}`,
    delete: (id: string) => `${this.ENDPOINT}/${id}`,
    create: this.ENDPOINT,
    validate_entities: `${this.ENDPOINT}/validation/entities`,
  } as const;
  /**
   * Получение всех регионов
   * @param filters - Фильтры для получения регионов
   * @returns Результат списка регионов, загрузка и ошибка
   */
  static async get(filters: LocaleFiltersDto): Promise<AxiosResponse<BaseListResult<Locale>>> {
    return await api.get<BaseListResult<Locale>>(this.LOCALES_PATHS.get(filters));
  }
  /**
   * Получение региона по ID
   * @param id - ID региона
   * @returns Результат региона, загрузка и ошибка
   */
  static async find(id: string): Promise<AxiosResponse<Locale | undefined>> {
    return await api.get<Locale | undefined>(this.LOCALES_PATHS.find(id));
  }
  /**
   * Создание региона
   * @param data - Данные для создания региона
   * @returns Результат создания региона, загрузка и ошибка
   */
  static async create(data: CreateLocaleFormData): Promise<AxiosResponse<Locale | undefined>> {
    return await api.post<Locale | undefined>(this.LOCALES_PATHS.create, ...createFormData(data));
  }
  /**
   * Обновление региона
   * @param id - ID региона
   * @param data - Данные для обновления региона
   * @returns Результат обновления региона, загрузка и ошибка
   */
  static async update(id: string, data: UpdateLocaleFormData): Promise<AxiosResponse<Locale | undefined>> {
    return await api.put<Locale | undefined>(this.LOCALES_PATHS.update(id), ...createFormData(data));
  }
  /**
   * Удаление региона
   * @param id - ID региона
   * @returns Результат удаления региона, загрузка и ошибка
   */
  static async delete(id: string): Promise<AxiosResponse<void>> {
    return await api.delete<void>(this.LOCALES_PATHS.delete(id));
  }

  static async validateEntities() {
    return await api.get<EntitiesValidationResult>(this.LOCALES_PATHS.validate_entities);
  }
}