import { api, createFormData, AxiosResponse, BaseListResult, formatQueryPath } from "@lib/api";
import { CreateLocalItemDescriptionFormData, UpdateLocalItemDescriptionFormData, LocalItemDescriptionsFiltersDto, LocalItemDescription } from "../types/local-item-descriptions.types";


/**
 * API для работы с локальными описаниями товаров
 */
export class LocalItemDescriptionsApi {
  private static readonly ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/local-item-descriptions`;

  private static readonly LOCAL_ITEM_DESCRIPTIONS_PATHS = {
    get: (filters: LocalItemDescriptionsFiltersDto) => formatQueryPath(this.ENDPOINT, filters),
    find: (id: string) => `${this.ENDPOINT}/${id}`,
    update: (id: string) => `${this.ENDPOINT}/${id}`,
    delete: (id: string) => `${this.ENDPOINT}/${id}`,
    reindex: `${this.ENDPOINT}/reindex`,
    create: this.ENDPOINT,
  } as const;
  /**
   * Получение всех локальных описаний товаров и услуг
   * @param filters - Фильтры для получения локальных описаний товаров и услуг
   * @returns Результат списка локальных описаний товаров и услуг
   */
  static async get(filters: LocalItemDescriptionsFiltersDto): Promise<AxiosResponse<BaseListResult<LocalItemDescription>>> {
    return await api.get<BaseListResult<LocalItemDescription>>(this.LOCAL_ITEM_DESCRIPTIONS_PATHS.get(filters));
  }
  /**
   * Получение локального описания товара или услуги по ID
   * @param id - ID локального описания товара или услуги
   * @returns Результат локального описания товара или услуги
   */
  static async find(id: string): Promise<AxiosResponse<LocalItemDescription | null>> {
    return await api.get<LocalItemDescription | null>(this.LOCAL_ITEM_DESCRIPTIONS_PATHS.find(id));
  }
  /**
   * Создание локального описания товара или услуги 
   * @param data - Данные для создания локального описания товара или услуги
   * @returns Результат создания локального описания товара или услуги
   */
  static async create(data: CreateLocalItemDescriptionFormData): Promise<AxiosResponse<LocalItemDescription | null>> {
    return await api.post<LocalItemDescription | null>(this.LOCAL_ITEM_DESCRIPTIONS_PATHS.create, ...createFormData(data));
  }
  /**
   * Обновление локального описания товара или услуги 
   * @param id - ID локального описания товара или услуги
   * @param data - Данные для обновления локального описания товара или услуги
   * @returns Результат обновления локального описания товара или услуги
   */
  static async update(id: string, data: UpdateLocalItemDescriptionFormData): Promise<AxiosResponse<LocalItemDescription | null>> {
    return await api.put<LocalItemDescription | null>(this.LOCAL_ITEM_DESCRIPTIONS_PATHS.update(id), ...createFormData(data));
  }

  /**
   * Обновление только порядка описания (без FormData)
   * @param id - ID локального описания товара или услуги
   * @param order - новый порядок
   * @returns Результат обновления локального описания товара или услуги
   */
  static async updateOrder(id: string, order: number): Promise<AxiosResponse<LocalItemDescription | null>> {
    return await api.put<LocalItemDescription | null>(this.LOCAL_ITEM_DESCRIPTIONS_PATHS.update(id), { order });
  }
  /**
   * Удаление локального описания товара или услуги
   * @param id - ID локального описания товара или услуги
   * @returns Результат удаления локального описания товара или услуги
   */
  static async delete(id: string): Promise<AxiosResponse<void>> {
    return await api.delete<void>(this.LOCAL_ITEM_DESCRIPTIONS_PATHS.delete(id));
  }
  /**
   * Реиндексация локальных описаний товара или услуги
   * @param data - Данные для реиндексации (local_product_id или local_service_id)
   * @returns Результат реиндексации локальных описаний товара или услуги
   */
  static async reindex(data: { local_product_id?: string; local_service_id?: string }): Promise<AxiosResponse<{ message: string }>> {
    return await api.post<{ message: string }>(this.LOCAL_ITEM_DESCRIPTIONS_PATHS.reindex, data);
  }
} 