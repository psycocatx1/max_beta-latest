import { TranslationEditor } from '@/components/admin/pages/locales/locale/translations';

interface PublicTranslationsPageProps {
  params: Promise<{ locale_id: string }>;
}

export default async function PublicTranslationsPage({ params }: PublicTranslationsPageProps) {
  const { locale_id } = await params;
  return <TranslationEditor locale_id={locale_id} module="public" />;
} 