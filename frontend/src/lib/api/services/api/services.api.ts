import { api, createFormData, AxiosResponse, BaseListResult, formatQueryPath } from "@lib/api";
import { CreateServiceFormData, UpdateServiceFormData, ExtendedService, ServiceFiltersDto, Service } from "../types/services.types";


/**
 * API для работы с услугами
 */
export class ServicesApi {
  private static readonly ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/services`;

  private static readonly SERVICES_PATHS = {
    get: (filters: ServiceFiltersDto) => formatQueryPath(this.ENDPOINT, filters),
    find: (id: string) => `${this.ENDPOINT}/${id}`,
    update: (id: string) => `${this.ENDPOINT}/${id}`,
    delete: (id: string) => `${this.ENDPOINT}/${id}`,
    create: this.ENDPOINT,
  } as const;
  /**
   * Получение всех услуг
   * @param filters - Фильтры для получения услуг
   * @returns Результат списка услуг
   */
  static async get(filters: ServiceFiltersDto): Promise<AxiosResponse<BaseListResult<ExtendedService>>> {
    return await api.get<BaseListResult<ExtendedService>>(this.SERVICES_PATHS.get(filters));
  }
  /**
   * Получение услуги по ID
   * @param id - ID услуги
   * @returns Результат услуги
   */
  static async find(id: string, locale_id?: string): Promise<AxiosResponse<ExtendedService | null>> {
    return await api.get<ExtendedService | null>(this.SERVICES_PATHS.find(id), { params: { locale_id } });
  }
  /**
   * Создание услуги
   * @param data - Данные для создания услуги
   * @returns Результат создания услуги
   */
  static async create(data: CreateServiceFormData): Promise<AxiosResponse<Service | null>> {
    return await api.post<Service | null>(this.SERVICES_PATHS.create, createFormData(data));
  }
  /**
   * Обновление услуги
   * @param id - ID услуги
   * @param data - Данные для обновления услуги
   * @returns Результат обновления услуги
   */
  static async update(id: string, data: UpdateServiceFormData): Promise<AxiosResponse<ExtendedService | null>> {
    return await api.put<ExtendedService | null>(this.SERVICES_PATHS.update(id), createFormData(data));
  }
  /**
   * Удаление услуги
   * @param id - ID услуги
   * @returns Результат удаления услуги
   */
  static async delete(id: string): Promise<AxiosResponse<void>> {
    return await api.delete<void>(this.SERVICES_PATHS.delete(id));
  }
} 