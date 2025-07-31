'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from '@hooks/useRouting';
import { useAccount } from '@/providers/AccountContext';
import classes from './RoleGuard.module.scss';
import { Role } from '@prisma/client';
import { pathnames } from '@lib/intl/pathnames.data';

interface RoleGuardProps {
  children: ReactNode;
  required_role?: Role;
  redirect_to?: keyof typeof pathnames;
  fallback?: ReactNode;
  require_auth?: boolean;
}

/**
 * Проверка, является ли текущая страница страницей аутентификации
 */
const isAuthPage = (pathname: string): boolean => {
  // Проверяем, содержит ли путь /auth
  return pathname.includes('/auth');
};

/**
 * Компонент для проверки ролей пользователя
 * @param children - Дочерние компоненты, которые показываются при наличии доступа
 * @param required_role - Требуемая роль или массив ролей
 * @param redirect_to - Путь для редиректа при отсутствии доступа
 * @param fallback - Компонент для отображения при отсутствии доступа (вместо редиректа)
 * @param require_auth - Требуется ли авторизация (по умолчанию true)
 */
export const RoleGuard = ({
  children,
  required_role,
  redirect_to = '/auth/login',
  fallback,
  require_auth = true
}: RoleGuardProps) => {
  const { user, is_loading, is_authenticated } = useAccount();
  const router = useRouter();
  const pathname = usePathname();

  // Если мы на странице аутентификации, просто рендерим детей без проверок
  const isOnAuthPage = isAuthPage(pathname);

  useEffect(() => {
    // Пропускаем проверки на страницах аутентификации
    if (isOnAuthPage) return;
    // Ждем полного завершения загрузки данных пользователя
    if (is_loading) return;

    // Проверяем авторизацию
    if (require_auth && !is_authenticated) {
      if (fallback) return;
      return router.push(redirect_to as Parameters<typeof router.push>[0]);
    }

    // Проверяем роль, если она указана
    if (required_role && user) {
      const user_role = user.role || 'user';

      let has_access = false;

      if (Array.isArray(required_role)) {
        has_access = required_role.includes(user_role);
      } else {
        has_access = user_role === required_role;
      }
      if (!has_access) {
        if (fallback) return;
        return router.push(redirect_to as Parameters<typeof router.push>[0]);
      }
    }

    // Проверяем, не заблокирован ли пользователь
    if (user?.is_banned) {
      if (fallback) return;
      return router.push('/');
    }

  }, [user, is_loading, is_authenticated, required_role, redirect_to, fallback, require_auth, router, isOnAuthPage, pathname]);

  // На страницах аутентификации всегда рендерим детей
  if (isOnAuthPage) {
    return <>{children}</>;
  }

  // Показываем индикатор загрузки
  if (is_loading) {
    return (
      <div className={classes.loading_container}>
        <div className={classes.loading_container_spinner}></div>
      </div>
    );
  }

  // Проверяем авторизацию
  if (require_auth && !is_authenticated) {
    return fallback || null;
  }

  // Проверяем роль, если она указана
  if (required_role && user) {
    const user_role = user.role || 'user';

    let has_access = false;

    if (Array.isArray(required_role)) {
      has_access = required_role.includes(user_role);
    } else {
      has_access = user_role === required_role;
    }

    if (!has_access) return fallback || null;
  }

  // Проверяем, не заблокирован ли пользователь
  if (user?.is_banned) {
    return fallback || (
      <div className={classes.banned_container}>
        <div className={classes.banned_container_content}>
          <h1 className={classes.banned_container_content_title}>Аккаунт заблокирован</h1>
          <p className={classes.banned_container_content_description}>
            Ваш аккаунт был заблокирован администратором.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};