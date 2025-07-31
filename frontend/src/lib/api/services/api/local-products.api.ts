import { api, AxiosResponse, BaseListResult, formatQueryPath } from "@lib/api";
import { LocalProduct, LocalProductFiltersDto, CreateLocalProductDto, UpdateLocalProductDto, ExtendedLocalProduct } from "../types/local-products.types";


/**
 * API для работы с локальными товарами
 */
export class LocalProductsApi {
  private static readonly ENDPOINT = '/local-products';

  private static readonly LOCAL_PRODUCTS_PATHS = {
    get: (filters: LocalProductFiltersDto) => formatQueryPath(this.ENDPOINT, filters),
    find: (id: string) => `${this.ENDPOINT}/${id}`,
    update: (id: string) => `${this.ENDPOINT}/${id}`,
    delete: (id: string) => `${this.ENDPOINT}/${id}`,
    create: this.ENDPOINT,
  } as const;
  /**
   * Получение всех локальных товаров
   * @param filters - Фильтры для получения локальных товаров
   * @returns Результат списка локальных товаров
   */
  static async get(filters: LocalProductFiltersDto): Promise<AxiosResponse<BaseListResult<ExtendedLocalProduct>>> {
    return await api.get<BaseListResult<ExtendedLocalProduct>>(this.LOCAL_PRODUCTS_PATHS.get(filters));
  }
  /**
   * Получение локального товара по ID
   * @param id - ID локального товара
   * @returns Результат локального товара
   */
  static async find(id: string): Promise<AxiosResponse<ExtendedLocalProduct>> {
    return await api.get<ExtendedLocalProduct>(this.LOCAL_PRODUCTS_PATHS.find(id));
  }
  /**
   * Создание локального товара
   * @param data - Данные для создания локального товара
   * @returns Результат создания локального товара
   */
  static async create(data: CreateLocalProductDto): Promise<AxiosResponse<LocalProduct | null>> {
    return await api.post<LocalProduct | null>(this.LOCAL_PRODUCTS_PATHS.create, data);
  }
  /**
   * Обновление локального товара
   * @param id - ID локального товара
   * @param data - Данные для обновления локального товара
   * @returns Результат обновления локального товара
   */
  static async update(id: string, data: UpdateLocalProductDto): Promise<AxiosResponse<ExtendedLocalProduct | null>> {
    return await api.put<LocalProduct | null>(this.LOCAL_PRODUCTS_PATHS.update(id), data);
  }
  /**
   * Удаление локального товара
   * @param id - ID локального товара
   * @returns Результат удаления локального товара
   */
  static async delete(id: string): Promise<AxiosResponse<void>> {
    return await api.delete<void>(this.LOCAL_PRODUCTS_PATHS.delete(id));
  }
} 