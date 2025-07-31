import { api, BaseListResult, formatQueryPath } from "@lib/api";
import { LocalServiceFiltersDto, UpdateLocalServiceDto, CreateLocalServiceDto, ExtendedLocalService, LocalService } from "../types/local-services.types";


/**
 * API для работы с локальными услугами
 */
export class LocalServicesApi {
  private static readonly ENDPOINT = '/local-services';

  private static readonly LOCAL_SERVICES_PATHS = {
    get: (filters: LocalServiceFiltersDto) => formatQueryPath(this.ENDPOINT, filters),
    find: (id: string) => `${this.ENDPOINT}/${id}`,
    update: (id: string) => `${this.ENDPOINT}/${id}`,
    delete: (id: string) => `${this.ENDPOINT}/${id}`,
    create: this.ENDPOINT,
  } as const;
  /**
   * Получение всех локальных услуг
   * @param filters - Фильтры для получения локальных услуг
   * @returns Результат списка локальных услуг
   */
  static async get(filters: LocalServiceFiltersDto) {
    return await api.get<BaseListResult<ExtendedLocalService>>(this.LOCAL_SERVICES_PATHS.get(filters));
  }
  /**
   * Получение локальной услуги по ID
   * @param id - ID локальной услуги
   * @returns Результат локальной услуги
   */
  static async find(id: string) {
    return await api.get<ExtendedLocalService | null>(this.LOCAL_SERVICES_PATHS.find(id));
  }
  /**
   * Создание локальной услуги
   * @param data - Данные для создания локальной услуги
   * @returns Результат создания локальной услуги
   */
  static async create(data: CreateLocalServiceDto) {
    return await api.post<LocalService | null>(this.LOCAL_SERVICES_PATHS.create, data);
  }
  /**
   * Обновление локальной услуги
   * @param id - ID локальной услуги
   * @param data - Данные для обновления локальной услуги
   * @returns Результат обновления локальной услуги
   */
  static async update(id: string, data: UpdateLocalServiceDto) {
    return await api.put<ExtendedLocalService | null>(this.LOCAL_SERVICES_PATHS.update(id), data);
  }
  /**
   * Удаление локальной услуги
   * @param id - ID локальнойуслуги
   * @returns Результат удаления локальной услуги
   */
  static async delete(id: string) {
    return await api.delete<void>(this.LOCAL_SERVICES_PATHS.delete(id));
  }
} 