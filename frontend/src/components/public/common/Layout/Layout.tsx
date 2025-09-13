import { Header, Footer } from '@/components/public/common/Layout';
import { FC } from 'react';
import styles from './Layout.module.scss';
import { LocalesApi } from '@/lib/api/services/api/locales.api';

interface LayoutProps {
  children: React.ReactNode;
  locale: string;
}

export const Layout: FC<LayoutProps> = ({ children, locale }) => {
  return (
    <div className={styles.layout}>
      <HeaderWrapper locale={locale} />
      <main className={styles.layout_main}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Отдельный компонент для Header с асинхронной логикой
const HeaderWrapper: FC<{ locale: string }> = async ({ locale }) => {
  const locales = (await LocalesApi.get({ take: 1000, skip: 0 })).data.items;
  return <Header locale={locale} locales={locales} />;
};