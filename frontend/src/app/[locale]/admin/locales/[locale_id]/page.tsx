import { Info } from "@/components/admin/pages/locales/locale";

interface LocalePageParams {
  params: Promise<{ locale_id: string }>;
}

export default async function Page({ params }: LocalePageParams) {
  const { locale_id } = await params;
  return <Info locale_id={locale_id} />;
} 