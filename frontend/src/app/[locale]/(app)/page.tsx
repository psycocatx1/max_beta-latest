import { Home } from '@/components/public/pages/home';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('public.pages.home.metadata');
  return {
    title: t('title'),
    description: t('description')
  }
}

export default async function HomePage() {
  return <Home />;
}
