import { ReactNode } from 'react';
import { Layout } from '@/components/public/common/Layout';

interface AppLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AppLayout({ children, params }: AppLayoutProps) {
  const { locale } = await params;
  return (
    <Layout locale={locale}>
      {children}
    </Layout>
  );
} 