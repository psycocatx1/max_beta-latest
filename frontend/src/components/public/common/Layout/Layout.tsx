import { Header, Footer } from '@/components/public/common/Layout';
import { FC } from 'react';
import styles from './Layout.module.scss';
import { LocalesApi } from '@/lib/api/services/api/locales.api';

interface LayoutProps {
  children: React.ReactNode;
  locale: string;
}

export const Layout: FC<LayoutProps> = async ({ children, locale }) => {
  const locales = (await LocalesApi.get({ take: 1000, skip: 0 })).data.items;
  return (
    <div className={styles.layout}>
      <Header locale={locale} locales={locales} />
      <main className={styles.layout_main}>
        {children}
      </main>
      <Footer />
    </div>
  );
};