'use client';

import { Link, usePathname } from '@/lib/intl';
import styles from './MainSidebar.module.scss';
import { navigation_items } from './navigation.data';
import { useEffect } from 'react';
import { ChevronLeft, Menu } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import { useTranslations } from 'next-intl';

export const MainSidebar = () => {
  const pathname = usePathname();
  const { isMainSidebarCollapsed, toggleMainSidebar } = useUIStore();
  const tMainSidebar = useTranslations('admin.common.main_layout.main_sidebar');

  useEffect(() => {
    localStorage.setItem('mainSidebarCollapsed', String(isMainSidebarCollapsed));
    const event = new CustomEvent('mainSidebarStateChanged', {
      detail: { collapsed: isMainSidebarCollapsed }
    });
    window.dispatchEvent(event);
  }, [isMainSidebarCollapsed]);

  const isActive = (path: string) => {
    if (path === '/admin') {
      return pathname === '/' || pathname.startsWith('/admin');
    }
    return pathname.startsWith(path);
  };

  const sidebarClass = `${styles.sidebar} ${isMainSidebarCollapsed ? styles.sidebar_collapsed : ''}`;

  return (
    <aside className={sidebarClass}>
      <div className={styles.sidebar_header}>
        {isMainSidebarCollapsed ? (
          <div
            className={styles.sidebar_logo_collapsed}
            onClick={toggleMainSidebar}
            title={tMainSidebar('expand_menu')}
          >
            <Menu size={24} />
          </div>
        ) : (
          <>
            <div className={styles.sidebar_logo}>{tMainSidebar('title')}</div>
            <button
              className={styles.sidebar_collapse_button}
              onClick={toggleMainSidebar}
              title={tMainSidebar('collapse_menu')}
            >
              <ChevronLeft size={24} />
            </button>
          </>
        )}
      </div>

      <nav className={styles.sidebar_menu}>
        {navigation_items.map((item) => {
          const title = tMainSidebar(item.title_key);
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`${styles.sidebar_menu_item} ${isActive(item.path) ? styles.sidebar_menu_item_active : ''}`}
              title={isMainSidebarCollapsed ? title : undefined}
            >
              <span className={styles.sidebar_icon}>{item.icon}</span>
              {!isMainSidebarCollapsed && <span className={styles.sidebar_item_text}>{title}</span>}
            </Link>
          );
        })}
      </nav>

      <div className={styles.sidebar_footer}>
        {!isMainSidebarCollapsed && <span>© {new Date().getFullYear()} {tMainSidebar('title')}</span>}
      </div>
    </aside>
  );
}; 