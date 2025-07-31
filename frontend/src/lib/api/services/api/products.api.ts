import { api, createFormData, BaseListResult, AxiosResponse, formatQueryPath } from '@lib/api';
import { CreateProductFormData, UpdateProductFormData, ProductFiltersDto, ExtendedProduct, Product } from "../types/products.types";


/**
 * API для работы с товарами
 */
export class ProductsApi {
  private static readonly ENDPOINT = '/products';

  private static readonly PRODUCTS_PATHS = {
    get: (filters: ProductFiltersDto) => formatQueryPath(this.ENDPOINT, filters),
    find: (id: string) => `${this.ENDPOINT}/${id}`,
    update: (id: string) => `${this.ENDPOINT}/${id}`,
    delete: (id: string) => `${this.ENDPOINT}/${id}`,
    create: this.ENDPOINT,
  } as const;
  /**
   * Получение всех товаров
   * @param filters - Фильтры для получения товаров
   * @returns Результат списка товаров
   */
  static async get(filters: ProductFiltersDto): Promise<AxiosResponse<BaseListResult<ExtendedProduct>>> {
    return await api.get<BaseListResult<ExtendedProduct>>(this.PRODUCTS_PATHS.get(filters));
  }
  /**
   * Получение товара по ID
   * @param id - ID товара
   * @returns Результат товара
   */
  static async find(id: string, locale_id?: string): Promise<AxiosResponse<ExtendedProduct | null>> {
    return await api.get<ExtendedProduct | null>(this.PRODUCTS_PATHS.find(id), { params: { locale_id } });
  }
  /**
   * Создание товара
   * @param data - Данные для создания товара
   * @returns Результат создания товара
   */
  static async create(data: CreateProductFormData): Promise<AxiosResponse<Product | null>> {
    return await api.post<Product | null>(this.PRODUCTS_PATHS.create, createFormData(data));
  }
  /**
   * Обновление товара
   * @param id - ID товара
   * @param data - Данные для обновления товара
   * @returns Результат обновления товара
   */
  static async update(id: string, data: UpdateProductFormData): Promise<AxiosResponse<ExtendedProduct | null>> {
    return await api.put<ExtendedProduct | null>(this.PRODUCTS_PATHS.update(id), createFormData(data));
  }
  /**
   * Удаление товара
   * @param id - ID товара
   * @returns Результат удаления товара
   */
  static async delete(id: string): Promise<AxiosResponse<void>> {
    return await api.delete<void>(this.PRODUCTS_PATHS.delete(id));
  }
} 