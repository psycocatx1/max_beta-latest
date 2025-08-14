import { api, createFormData, BaseListResult, AxiosResponse, formatQueryPath } from '@lib/api';
import { Prisma } from '@prisma/client';
import { User, UserFiltersDto, UpdateUserFormData } from "../types/users.types";

/**
 * API для работы с пользователями
 */
export class UsersApi {
  private static readonly ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/users`;
  private static readonly USERS_PATHS = {
    get: (filters: UserFiltersDto) => formatQueryPath(this.ENDPOINT, filters),
    find: (where: Prisma.UserWhereUniqueInput) => formatQueryPath(`${this.ENDPOINT}/find/`, { id: where.id }),
    update: (where: Prisma.UserWhereUniqueInput) => formatQueryPath(this.ENDPOINT, where),
  } as const;
  /**
   * Получение пользователя
   * @param where - Условие для получения пользователя
   * @returns Результат пользователя, загрузка и ошибка
   */
  static async find(where: Prisma.UserWhereUniqueInput): Promise<AxiosResponse<User | null>> {
    return await api.get<User | null>(this.USERS_PATHS.find(where));
  }
  /**
   * Получение всех пользователей
   * @param filters - Фильтры для получения пользователей
   * @returns Результат списка пользователей, загрузка и ошибка
   */
  static async get(filters: UserFiltersDto): Promise<AxiosResponse<BaseListResult<User>>> {
    return await api.get<BaseListResult<User>>(this.USERS_PATHS.get(filters));
  }
  /**
   * Обновление пользователя
   * @param where - Условие для обновления пользователя
   * @param user - Данные для обновления пользователя
   * @returns Результат обновления пользователя, загрузка и ошибка
   */
  static async update(where: Prisma.UserWhereUniqueInput, user: UpdateUserFormData): Promise<AxiosResponse<User | null>> {
    return await api.put<User | null>(this.USERS_PATHS.update(where), ...createFormData(user));
  }
}