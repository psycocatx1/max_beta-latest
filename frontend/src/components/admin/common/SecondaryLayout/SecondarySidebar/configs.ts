import { User, Timer, ShoppingBag, Globe, ImageIcon, FolderTree, PanelLeftClose, Briefcase, ScrollText, FileText, Users, Languages } from 'lucide-react';
import { UserNavItem, LocaleNavItem, CategoryNavItem, SecondarySidebarConfig, ItemNavItem, LocalItemNavItem } from './types';

// Конфигурация для пользовательского сайдбара
export const userSidebarConfig: SecondarySidebarConfig = {
  title: 'user_management',
  placeholder_key: 'user_id',
  nav_items: [
    {
      id: 'info',
      label: 'information',
      icon: User,
      path: '/admin/users/[user_id]'
    },
    {
      id: 'sessions',
      label: 'sessions',
      icon: Timer,
      path: '/admin/users/[user_id]/sessions'
    }
  ] as UserNavItem[]
};

// Конфигурация для сайдбара категорий товаров
export const productCategorySidebarConfig = (has_children: boolean): SecondarySidebarConfig => ({
  title: 'category_management',
  placeholder_key: 'category_id',
  nav_items: [
    {
      id: 'info',
      label: 'information',
      icon: FileText,
      path: '/admin/product-categories/[category_id]'
    },
    ...(has_children ? [
      {
        id: 'categories',
        label: 'categories',
        icon: FolderTree,
        path: '/admin/product-categories/[category_id]/categories'
      },
    ] : []),
    {
      id: 'products',
      label: 'products',
      icon: ShoppingBag,
      path: '/admin/product-categories/[category_id]/products'
    },
    {
      id: 'locales',
      label: 'translations',
      icon: Globe,
      path: '/admin/product-categories/[category_id]/locales'
    }
  ] as CategoryNavItem[]
});

// Конфигурация для сайдбара категорий услуг
export const serviceCategorySidebarConfig = (has_children: boolean): SecondarySidebarConfig => ({
  title: 'category_management',
  placeholder_key: 'category_id',
  nav_items: [
    {
      id: 'info',
      label: 'information',
      icon: FileText,
      path: '/admin/service-categories/[category_id]'
    },
    ...(has_children ? [
      {
        id: 'categories',
        label: 'categories',
        icon: FolderTree,
        path: '/admin/service-categories/[category_id]/categories'
      },
    ] : []),
    {
      id: 'locales',
      label: 'translations',
      icon: Globe,
      path: '/admin/service-categories/[category_id]/locales'
    },
    {
      id: 'services',
      label: 'services',
      icon: Briefcase,
      path: '/admin/service-categories/[category_id]/services'
    }
  ] as CategoryNavItem[]
});

// Конфигурация для сайдбара локализации
export const localeSidebarConfig: SecondarySidebarConfig = {
  title: 'locale_management',
  placeholder_key: 'locale_id',
  nav_items: [
    {
      id: 'info',
      label: 'information',
      icon: FileText,
      path: '/admin/locales/[locale_id]'
    },
    {
      id: 'users',
      label: 'users',
      icon: Users,
      path: '/admin/locales/[locale_id]/users'
    },
    {
      id: 'product_categories',
      label: 'product_categories',
      icon: FolderTree,
      path: '/admin/locales/[locale_id]/product-categories'
    },
    {
      id: 'products',
      label: 'products',
      icon: ShoppingBag,
      path: '/admin/locales/[locale_id]/products'
    },
    {
      id: 'services',
      label: 'services',
      icon: Briefcase,
      path: '/admin/locales/[locale_id]/services'
    },
    {
      id: 'service_categories',
      label: 'service_categories',
      icon: PanelLeftClose,
      path: '/admin/locales/[locale_id]/service-categories'
    },
    {
      id: 'admin_translations',
      label: 'admin_translations',
      icon: Languages,
      path: '/admin/locales/[locale_id]/translations/admin'
    },
    {
      id: 'common_translations',
      label: 'common_translations',
      icon: Languages,
      path: '/admin/locales/[locale_id]/translations/common'
    },
    {
      id: 'public_translations',
      label: 'public_translations',
      icon: Languages,
      path: '/admin/locales/[locale_id]/translations/public'
    },
    {
      id: 'forms',
      label: 'forms',
      icon: FileText,
      path: '/admin/locales/[locale_id]/forms'
    }
  ] as LocaleNavItem[]
};

// Конфигурация для сайдбара товаров
export const productSidebarConfig: SecondarySidebarConfig = {
  title: 'product_management',
  placeholder_key: 'product_id',
  nav_items: [
    {
      id: 'info',
      label: 'information',
      icon: FileText,
      path: '/admin/products/[product_id]'
    },
    {
      id: 'images',
      label: 'images',
      icon: ImageIcon,
      path: '/admin/products/[product_id]/images'
    },
    {
      id: 'locales',
      label: 'translations',
      icon: Globe,
      path: '/admin/products/[product_id]/locales'
    },
    {
      id: 'descriptions',
      label: 'descriptions',
      icon: ScrollText,
      path: '/admin/products/[product_id]/descriptions'
    }
  ] as ItemNavItem[]
};

// Конфигурация для сайдбара услуг
export const serviceSidebarConfig: SecondarySidebarConfig = {
  title: 'service_management',
  placeholder_key: 'service_id',
  nav_items: [
    {
      id: 'info',
      label: 'information',
      icon: FileText,
      path: '/admin/services/[service_id]'
    },
    {
      id: 'images',
      label: 'images',
      icon: ImageIcon,
      path: '/admin/services/[service_id]/images'
    },
    {
      id: 'locales',
      label: 'translations',
      icon: Globe,
      path: '/admin/services/[service_id]/locales'
    },
    {
      id: 'descriptions',
      label: 'descriptions',
      icon: ScrollText,
      path: '/admin/services/[service_id]/descriptions'
    }
  ] as ItemNavItem[]
};

// Конфигурация для сайдбара локализации товара
export const localProductSidebarConfig: SecondarySidebarConfig = {
  title: 'local_product_management',
  placeholder_key: 'local_product_id',
  nav_items: [
    {
      id: 'info',
      label: 'information',
      icon: FileText,
      path: '/admin/local-products/[local_product_id]'
    },
    {
      id: 'descriptions',
      label: 'descriptions',
      icon: ScrollText,
      path: '/admin/local-products/[local_product_id]/descriptions'
    }
  ] as LocalItemNavItem[]
};

// Конфигурация для сайдбара локализации услуги
export const localServiceSidebarConfig: SecondarySidebarConfig = {
  title: 'local_service_management',
  placeholder_key: 'local_service_id',
  nav_items: [
    {
      id: 'info',
      label: 'information',
      icon: FileText,
      path: '/admin/local-services/[local_service_id]'
    },
    {
      id: 'descriptions',
      label: 'descriptions',
      icon: ScrollText,
      path: '/admin/local-services/[local_service_id]/descriptions'
    }
  ] as LocalItemNavItem[]
};

