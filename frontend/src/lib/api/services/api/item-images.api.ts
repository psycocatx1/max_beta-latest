import { api, createFormData, AxiosResponse, BaseListResult, formatQueryPath } from "@lib/api";
import { CreateItemImageFormData, UpdateItemImageFormData, ItemImagesFiltersDto, ItemImage } from "../types/item-images.types";


/**
 * API для работы с изображениями товаров и услуг
 */
export class ItemImagesApi {
  private static readonly ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/item-images`;

  private static readonly ITEM_IMAGES_PATHS = {
    get: (filters: ItemImagesFiltersDto) => formatQueryPath(this.ENDPOINT, filters),
    find: (id: string) => `${this.ENDPOINT}/${id}`,
    update: (id: string) => `${this.ENDPOINT}/${id}`,
    delete: (id: string) => `${this.ENDPOINT}/${id}`,
    create: this.ENDPOINT,
  } as const;
  /**
   * Получение всех изображений товаров и услуг
   * @param filters - Фильтры для получения изображений товаров и услуг
   * @returns Результат списка изображений товаров и услуг
   */
  static async get(filters: ItemImagesFiltersDto): Promise<AxiosResponse<BaseListResult<ItemImage>>> {
    return await api.get<BaseListResult<ItemImage>>(this.ITEM_IMAGES_PATHS.get(filters));
  }
  /**
   * Получение изображения товара или услуги по ID
   * @param id - ID изображения товара или услуги
   * @returns Результат изображения товара или услуги
   */
  static async find(id: string): Promise<AxiosResponse<ItemImage | null>> {
    return await api.get<ItemImage | null>(this.ITEM_IMAGES_PATHS.find(id));
  }
  /**
   * Создание изображения товара или услуги
   * @param data - Данные для создания изображения товара или услуги
   * @returns Результат создания изображения товара или услуги
   */
  static async create(data: CreateItemImageFormData): Promise<AxiosResponse<ItemImage | null>> {
    return await api.post<ItemImage | null>(this.ITEM_IMAGES_PATHS.create, createFormData(data));
  }
  /**
   * Обновление изображения товара или услуги
   * @param id - ID изображения товара или услуги
   * @param data - Данные для обновления изображения товара или услуги
   * @returns Результат обновления изображения товара или услуги
   */
  static async update(id: string, data: UpdateItemImageFormData): Promise<AxiosResponse<ItemImage | null>> {
    return await api.put<ItemImage | null>(this.ITEM_IMAGES_PATHS.update(id), createFormData(data));
  }
  /**
   * Удаление изображения товара или услуги
   * @param id - ID изображения товара или услуги
   * @returns Результат удаления изображения товара или услуги
   */
  static async delete(id: string): Promise<AxiosResponse<void>> {
    return await api.delete<void>(this.ITEM_IMAGES_PATHS.delete(id));
  }
} 