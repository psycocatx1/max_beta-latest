import { api, createFormData, BaseListResult, AxiosResponse, formatQueryPath } from '@lib/api';
import { ExtendedCategory, CategoryWithCounts, CreateCategoryFormData, UpdateCategoryFormData, CategoryFiltersDto, Category } from '../types/categories.types';

/**
 * API для работы с категориями
 */
export class CategoriesApi {
  private static readonly ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

  private static readonly CATEGORIES_PATHS = {
    get: (filters: CategoryFiltersDto) => formatQueryPath(this.ENDPOINT, filters),
    find: (id: string) => `${this.ENDPOINT}/${id}`,
    update: (id: string) => `${this.ENDPOINT}/${id}`,
    delete: (id: string) => `${this.ENDPOINT}/${id}`,
    create: this.ENDPOINT,
  } as const;

  /**
   * Получение всех категорий в виде дерева с локализацией и рекурсивными счетчиками
   * @param filters - Фильтры для получения категорий
   * @returns Результат дерева категорий
   */
  static async get(filters: CategoryFiltersDto): Promise<AxiosResponse<BaseListResult<CategoryWithCounts>>> {
    return await api.get<BaseListResult<CategoryWithCounts>>(this.CATEGORIES_PATHS.get(filters));
  }

  /**
   * Получение категории по ID с деревом предков, продуктами и услугами
   * @param id - ID категории
   * @param locale_id - ID локализации
   * @returns Результат категории с полной информацией
   */
  static async find(id: string, locale_id?: string): Promise<AxiosResponse<ExtendedCategory | null>> {
    const params = new URLSearchParams();
    if (locale_id) params.append('locale_id', locale_id);
    const base_url = this.CATEGORIES_PATHS.find(id);
    const url = params.toString() ? `${base_url}?${params.toString()}` : base_url;
    return await api.get<ExtendedCategory | null>(url);
  }
  /**
   * Создание категории
   * @param data - Данные для создания категории
   * @returns Результат создания категории
   */
  static async create(data: CreateCategoryFormData): Promise<AxiosResponse<Category | null>> {
    return await api.post<Category | null>(this.CATEGORIES_PATHS.create, ...createFormData(data));
  }
  /**
   * Обновление категории
   * @param id - ID категории
   * @param data - Данные для обновления категории
   * @returns Результат обновления категории
   */
  static async update(id: string, data: UpdateCategoryFormData): Promise<AxiosResponse<ExtendedCategory | null>> {
    return await api.put<ExtendedCategory | null>(this.CATEGORIES_PATHS.update(id), ...createFormData(data));
  }
  /**
   * Удаление категории
   * @param id - ID категории
   * @returns Результат удаления категории
   */
  static async delete(id: string): Promise<AxiosResponse<void>> {
    return await api.delete<void>(this.CATEGORIES_PATHS.delete(id));
  }
} 