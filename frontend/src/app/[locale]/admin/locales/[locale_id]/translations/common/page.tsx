import { TranslationEditor } from '@/components/admin/pages/locales/locale/translations';

interface CommonTranslationsPageProps {
  params: Promise<{ locale_id: string }>;
}

export default async function CommonTranslationsPage({ params }: CommonTranslationsPageProps) {
  const { locale_id } = await params;
  return <TranslationEditor locale_id={locale_id} module="common" />;
} 