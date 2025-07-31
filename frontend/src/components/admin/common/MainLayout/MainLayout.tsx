'use client';

import { ReactNode } from 'react';
import { Header } from './Header';
import { MainSidebar } from './MainSidebar';
import styles from './MainLayout.module.scss';
import { useUIStore } from '@/store/useUIStore';
import { ToastProvider } from '@/providers/ToastProvider/ToastContext';
import { Locale } from '@prisma/client';

interface MainLayoutProps {
  children: ReactNode;
  locale: string;
  locales: Locale[];
}

export const MainLayout = ({ children, locale, locales }: MainLayoutProps) => {
  const { isMainSidebarCollapsed } = useUIStore();

  const mainClass = isMainSidebarCollapsed
    ? `${styles.admin_layout_main} ${styles.admin_layout_main_collapsed}`
    : styles.admin_layout_main;

  return (
    <ToastProvider>
      <div className={styles.admin_layout}>
        <MainSidebar />
        <Header locale={locale} locales={locales} />
        <main className={mainClass}>
          {children}
        </main>
      </div>
    </ToastProvider>
  );
}; 