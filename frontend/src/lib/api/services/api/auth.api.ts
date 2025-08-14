import { api, clearTokensCookies, query_client } from '@/lib/api';
import { AuthResponse, LoginDto, RegisterDto } from '@lib/api/services/types/users.types';
import { User } from '@prisma/client';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

/**
 * Получение текущей локали из URL
 */
const getCurrentLocale = (): string => {
  if (typeof window === 'undefined') return 'ru';
  const path = window.location.pathname;
  const locale = path.split('/')[1];
  if (locale && ['ru', 'gb', 'ua', 'pl'].includes(locale)) return locale;
  return 'ru'; // локаль по умолчанию
};

const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

/**
 * Пути для работы с авторизацией
 */
const AUTH_PATHS = {
  login: `${ENDPOINT}/login`,
  register: `${ENDPOINT}/register`,
  logout: `${ENDPOINT}/logout`,
  me: `${ENDPOINT}/me`,
  refresh: `${ENDPOINT}/refresh`,
} as const;

/**
 * API для работы с авторизацией
 */
export class AuthApi {
  public readonly query_keys = {
    account: () => ['account'],
  } as const;

  // Метод для получения данных текущего пользователя
  async getProfile(): Promise<User> {
    return (await api.get<User>(AUTH_PATHS.me)).data;
  }
  onSuccessLogin({ data, refetchUser, router }: { data: AuthResponse, refetchUser: () => void, router: AppRouterInstance }) {
    if (data.user) query_client.setQueryData(this.query_keys.account(), data.user);
    refetchUser();
    // Получаем текущую локаль и перенаправляем на админ-панель
    const locale = getCurrentLocale();
    const dashboardPath = `/${data.user.locale?.symbol ? data.user.locale.symbol.toLowerCase() : locale}/${data.user.role !== 'USER' && 'admin'}`;
    router.push(dashboardPath);
  }

  async login(credentials: LoginDto): Promise<AuthResponse> {
    return (await api.post<AuthResponse>(AUTH_PATHS.login, credentials)).data;
  }

  async register(credentials: RegisterDto) {
    return (await api.post<AuthResponse>(AUTH_PATHS.register, credentials)).data;
  }

  onSuccessLogout({ clearUser, router }: { clearUser: () => void, router: AppRouterInstance }) {
    clearTokensCookies();
    clearUser();
    query_client.clear();
    // Получаем текущую локаль и перенаправляем на главную страницу
    router.push(`/${getCurrentLocale()}`);
  }

  async logout() {
    await api.post(AUTH_PATHS.logout)
  }
}

export const authApi = new AuthApi()
