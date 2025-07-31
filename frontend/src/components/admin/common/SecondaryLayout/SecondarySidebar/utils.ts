import { pathnames } from '@/lib/intl';

// Типы для различных параметров маршрутов
type RouteParams = {
  user_id?: string;
  locale_id?: string;
  product_id?: string;
  category_id?: string;
  order_id?: string;
};

// Утилитарная функция для создания типизированного объекта навигации
export const createTypedNavigation = <T extends keyof typeof pathnames>(
  path: T,
  params: RouteParams
) => {
  return {
    pathname: path,
    params
  } as const;
};

// Функция для безопасной навигации с проверкой типов
export const getNavigationObject = (
  path: keyof typeof pathnames,
  placeholder_key: string,
  item_id: string
) => {
  const params: RouteParams = { [placeholder_key]: item_id } as RouteParams;
  return createTypedNavigation(path, params);
}; 