import { TranslationEditor } from '@/components/admin/pages/locales/locale/translations';

interface AdminTranslationsPageProps {
  params: Promise<{ locale_id: string }>;
}

export default async function AdminTranslationsPage({ params }: AdminTranslationsPageProps) {
  const { locale_id } = await params;
  return <TranslationEditor locale_id={locale_id} module="admin" />;
} 