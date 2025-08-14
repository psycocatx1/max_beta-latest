import { api, BaseListResult, AxiosResponse, formatQueryPath } from '@lib/api';
import { ExtendedLocalCategory, CreateLocalCategoryDto, UpdateLocalCategoryDto, LocalCategoryFiltersDto } from '../types/local-categories.types';


/**
 * API для работы с локализациями категорий
 */
export class LocalCategoriesApi {
  private static readonly ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/local-categories`;

  private static readonly LOCAL_CATEGORIES_PATHS = {
    get: (filters: LocalCategoryFiltersDto) => formatQueryPath(this.ENDPOINT, filters),
    find: (id: string) => `${this.ENDPOINT}/${id}`,
    update: (id: string) => `${this.ENDPOINT}/${id}`,
    delete: (id: string) => `${this.ENDPOINT}/${id}`,
    create: this.ENDPOINT,
    bulk: `${this.ENDPOINT}/bulk`,
    by_category: (category_id: string) => `${this.ENDPOINT}/by-category/${category_id}`,
    by_category_and_locale: (category_id: string, locale_id: string) => `${this.ENDPOINT}/by-category/${category_id}/locale/${locale_id}`,
  } as const;
  /**
   * Получение всех локализаций категорий
   * @param filters - Фильтры для получения локализаций категорий
   * @returns Результат списка локализаций категорий
   */
  static async get(filters: LocalCategoryFiltersDto): Promise<AxiosResponse<BaseListResult<ExtendedLocalCategory>>> {
    return await api.get<BaseListResult<ExtendedLocalCategory>>(this.LOCAL_CATEGORIES_PATHS.get(filters));
  }
  /**
   * Получение локализации категории по ID
   * @param id - ID локализации категории
   * @returns Результат локализации категории
   */
  static async find(id: string): Promise<AxiosResponse<ExtendedLocalCategory | null>> {
    return await api.get<ExtendedLocalCategory | null>(this.LOCAL_CATEGORIES_PATHS.find(id));
  }
  /**
   * Получение всех локализаций для конкретной категории
   * @param category_id - ID категории
   * @returns Результат всех локализаций категории
   */
  static async getByCategory(category_id: string): Promise<AxiosResponse<ExtendedLocalCategory[]>> {
    return await api.get<ExtendedLocalCategory[]>(this.LOCAL_CATEGORIES_PATHS.by_category(category_id));
  }
  /**
   * Получение локализации для конкретной категории и локали
   * @param category_id - ID категории
   * @param locale_id - ID локали
   * @returns Результат локализации
   */
  static async getByCategoryAndLocale(category_id: string, locale_id: string): Promise<AxiosResponse<ExtendedLocalCategory | null>> {
    return await api.get<ExtendedLocalCategory | null>(this.LOCAL_CATEGORIES_PATHS.by_category_and_locale(category_id, locale_id));
  }
  /**
   * Создание локализации категории
   * @param data - Данные для создания локализации категории
   * @returns Результат создания локализации категории
   */
  static async create(data: CreateLocalCategoryDto): Promise<AxiosResponse<ExtendedLocalCategory | null>> {
    return await api.post<ExtendedLocalCategory | null>(this.LOCAL_CATEGORIES_PATHS.create, data);
  }
  /**
   * Обновление локализации категории
   * @param id - ID локализации категории
   * @param data - Данные для обновления локализации категории
   * @returns Результат обновления локализации категории
   */
  static async update(id: string, data: UpdateLocalCategoryDto): Promise<AxiosResponse<ExtendedLocalCategory | null>> {
    return await api.put<ExtendedLocalCategory | null>(this.LOCAL_CATEGORIES_PATHS.update(id), data);
  }
  /**
   * Удаление локализации категории
   * @param id - ID локализации категории
   * @returns Результат удаления локализации категории
   */
  static async delete(id: string): Promise<AxiosResponse<void>> {
    return await api.delete<void>(this.LOCAL_CATEGORIES_PATHS.delete(id));
  }
  /**
   * Массовое создание локализаций для категории
   * @param category_id - ID категории
   * @param localizations - Массив данных локализаций
   * @returns Результат создания локализаций
   */
  static async createBulk(category_id: string, localizations: Omit<CreateLocalCategoryDto, 'category_id'>[]): Promise<AxiosResponse<ExtendedLocalCategory[]>> {
    const data = localizations.map(loc => ({ ...loc, category_id }));
    return await api.post<ExtendedLocalCategory[]>(this.LOCAL_CATEGORIES_PATHS.bulk, data);
  }
}