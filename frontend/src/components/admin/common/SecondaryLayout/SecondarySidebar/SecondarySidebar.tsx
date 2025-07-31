'use client';

import styles from './SecondarySidebar.module.scss';
import { pathnames, useRouter, usePathname } from '@/lib/intl';
import { SecondarySidebarProps } from './types';
import { getNavigationObject } from './utils';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronLeft, Menu } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { useMemo, useCallback, memo } from 'react';

export const SecondarySidebar: React.FC<SecondarySidebarProps> = memo(({
  title,
  item_id,
  nav_items,
  placeholder_key
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const tSidebar = useTranslations('admin.common.secondary_layout.secondary_sidebar');

  // Используем Zustand store вместо локального состояния
  const { isSecondarySidebarCollapsed, toggleSecondarySidebar } = useUIStore();

  const handleNavigate = useCallback((path: typeof nav_items[0]['path']) => {
    const navigationObject = getNavigationObject(path, placeholder_key, item_id);
    router.push(navigationObject as Parameters<typeof router.push>[0]);
  }, [router, placeholder_key, item_id]);

  const isActive = useCallback((path: typeof nav_items[0]['path']) => {
    if (!path) return false;

    // Для русской локали используем переводы из pathnames
    const localizedPath = locale === 'ru' ?
      pathnames[path as keyof typeof pathnames] :
      path;

    if (!localizedPath) return false;

    // Получаем финальный путь для сравнения
    const finalPath = typeof localizedPath === 'object'
      ? localizedPath[locale as keyof typeof localizedPath]
      : localizedPath;

    if (!finalPath) return false;

    // Заменяем плейсхолдер на реальный ID, если есть
    const resolvedPath = placeholder_key && item_id
      ? finalPath.replace(`[${placeholder_key}]`, item_id)
      : finalPath;

    const fullPath = `/${locale}${resolvedPath}`;

    // Строгое сравнение для точного совпадения пути
    return pathname === fullPath;
  }, [pathname, locale, placeholder_key, item_id]);

  const sidebarClass = `${styles.secondary_sidebar} ${isSecondarySidebarCollapsed ? styles.secondary_sidebar_collapsed : ''}`;

  const navItemsWithActive = useMemo(() => {
    return nav_items.map((item) => ({
      ...item,
      isActive: isActive(item.path)
    }));
  }, [nav_items, isActive]);

  return (
    <div className={sidebarClass}>
      <div className={styles.secondary_sidebar_header}>
        {isSecondarySidebarCollapsed ? (
          <div
            className={styles.secondary_sidebar_logo_collapsed}
            onClick={toggleSecondarySidebar}
            title={tSidebar('expand_menu')}
          >
            <Menu size={24} />
          </div>
        ) : (
          <>
            <h3 className={styles.secondary_sidebar_title} data-intl-key={`admin.common.secondary_layout.secondary_sidebar.${title}`}>{tSidebar(title)}</h3>
            <button
              className={styles.secondary_sidebar_collapse_button}
              onClick={toggleSecondarySidebar}
              title={tSidebar('collapse_menu')}
            >
              <ChevronLeft size={24} />
            </button>
          </>
        )}
      </div>

      <nav className={styles.secondary_sidebar_nav}>
        {navItemsWithActive.map((item) => (
          <button
            key={item.id}
            className={`${styles.secondary_sidebar_nav_item} ${item.isActive ? styles.secondary_sidebar_nav_item_active : ''}`}
            onClick={() => handleNavigate(item.path)}
            title={isSecondarySidebarCollapsed ? item.label : undefined}
          >
            <item.icon size={24} />
            {!isSecondarySidebarCollapsed && <span data-intl-key={`admin.common.secondary_layout.secondary_sidebar.${item.label}`}>{tSidebar(item.label)}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
});

SecondarySidebar.displayName = 'SecondarySidebar'; 