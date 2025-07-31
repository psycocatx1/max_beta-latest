import { pathnames } from '@/lib/intl';

// Тип для ключей pathnames
export type PathKeys = keyof typeof pathnames;


export interface SecondarySidebarProps {
  title: string;
  placeholder_key: string;
  nav_items: NavItem[];
  item_id: string
};

export interface SecondarySidebarConfig {
  title: string;
  placeholder_key: string;
  nav_items: NavItem[];
}

// Интерфейс для элемента навигации
export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  path: PathKeys;
}

export type ItemNavItem = NavItem & {
  path: '/admin/products/[product_id]'
  | '/admin/services/[service_id]'
  | '/admin/products/[product_id]/images'
  | '/admin/services/[service_id]/images'
  | '/admin/products/[product_id]/locales'
  | '/admin/services/[service_id]/locales'
  | '/admin/products/[product_id]/descriptions'
  | '/admin/services/[service_id]/descriptions'
}

export type LocalItemNavItem = NavItem & {
  path: '/admin/local-products/[local_product_id]'
  | '/admin/local-services/[local_service_id]'
  | '/admin/local-products/[local_product_id]/descriptions'
  | '/admin/local-services/[local_service_id]/descriptions'
}

// Типы для конкретных сайдбаров
export type UserNavItem = NavItem & {
  path: '/admin/users/[user_id]' | '/admin/users/[user_id]/sessions';
};

export type CategoryNavItem = NavItem & {
  path: '/admin/product-categories/[category_id]'
  | '/admin/product-categories/[category_id]/products'
  | '/admin/product-categories/[category_id]/locales'
  | '/admin/service-categories/[category_id]'
  | '/admin/service-categories/[category_id]/products'
  | '/admin/service-categories/[category_id]/locales';
};

export type LocaleNavItem = NavItem & {
  path: '/admin/locales/[locale_id]'
  | '/admin/locales/[locale_id]/users'
  | '/admin/locales/[locale_id]/product-categories'
  | '/admin/locales/[locale_id]/products'
  | '/admin/locales/[locale_id]/services'
  | '/admin/locales/[locale_id]/service-categories'
  | '/admin/locales/[locale_id]/translations/admin'
  | '/admin/locales/[locale_id]/translations/common'
  | '/admin/locales/[locale_id]/translations/public';
};
