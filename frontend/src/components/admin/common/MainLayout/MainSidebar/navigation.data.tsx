import { Users, Globe } from 'lucide-react';
import { LayoutDashboard, ShoppingBag, FolderTree, FolderSearch, Briefcase, Languages } from 'lucide-react';

interface NavigationItem {
  title_key: string;
  path: '/admin' | '/admin/users' | '/admin/locales' | '/admin/product-categories' | '/admin/products' | '/admin/service-categories' | '/admin/services' | '/admin/local-products' | '/admin/local-services';
  icon: React.ReactNode;
}

export const navigation_items: NavigationItem[] = [
  {
    title_key: 'navigation.dashboard',
    path: '/admin',
    icon: <LayoutDashboard size={24} />
  },
  {
    title_key: 'navigation.users',
    path: '/admin/users',
    icon: <Users size={24} />
  },
  {
    title_key: 'navigation.locales',
    path: '/admin/locales',
    icon: <Globe size={24} />
  },
  {
    title_key: 'navigation.product_categories',
    path: '/admin/product-categories',
    icon: <FolderTree size={24} />
  },
  {
    title_key: 'navigation.products',
    path: '/admin/products',
    icon: <ShoppingBag size={24} />
  },
  {
    title_key: 'navigation.local_products',
    path: '/admin/local-products',
    icon: <Languages size={24} />
  },
  {
    title_key: 'navigation.service_categories',
    path: '/admin/service-categories',
    icon: <FolderSearch size={24} />
  },
  {
    title_key: 'navigation.services',
    path: '/admin/services',
    icon: <Briefcase size={24} />
  },
  {
    title_key: 'navigation.local_services',
    path: '/admin/local-services',
    icon: <Languages size={24} />
  }
];