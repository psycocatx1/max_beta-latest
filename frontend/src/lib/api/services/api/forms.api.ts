import { api, BaseListResult, AxiosResponse, formatQueryPath } from '@lib/api';
import { CreateFormDto, FormsFiltersDto, ExtendedForm } from '../types/forms.types';

export class FormsApi {
  private static readonly ENDPOINT = '/forms';

  private static readonly FORMS_PATHS = {
    get: (filters: FormsFiltersDto) => formatQueryPath(this.ENDPOINT, filters),
    find: (id: string) => `${this.ENDPOINT}/${id}`,
    create: (locale: string) => `${this.ENDPOINT}/${locale}`,
    markAsAnswered: (id: string) => `${this.ENDPOINT}/${id}`,
    delete: (id: string) => `${this.ENDPOINT}/${id}`,
  } as const;

  // Создание формы (публичное API)
  static async create(locale: string, data: CreateFormDto): Promise<AxiosResponse<ExtendedForm>> {
    return await api.post<ExtendedForm>(this.FORMS_PATHS.create(locale), data);
  }

  // Получение списка форм (админ)
  static async get(filters: FormsFiltersDto): Promise<AxiosResponse<BaseListResult<ExtendedForm>>> {
    return await api.get<BaseListResult<ExtendedForm>>(this.FORMS_PATHS.get(filters));
  }

  // Получение конкретной формы (админ)
  static async find(id: string): Promise<AxiosResponse<ExtendedForm>> {
    return await api.get<ExtendedForm>(this.FORMS_PATHS.find(id));
  }

  // Отметить форму как отвеченную (админ)
  static async markAsAnswered(id: string): Promise<AxiosResponse<ExtendedForm>> {
    return await api.put<ExtendedForm>(this.FORMS_PATHS.markAsAnswered(id));
  }

  // Удаление формы (админ)
  static async delete(id: string): Promise<AxiosResponse<void>> {
    return await api.delete<void>(this.FORMS_PATHS.delete(id));
  }
} 