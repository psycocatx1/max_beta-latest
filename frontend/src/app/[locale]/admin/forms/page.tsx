import { Forms } from "@/components/admin/pages/forms/root";
import { LocalesApi } from "@/lib/api";

interface FormsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function FormsPage({ params }: FormsPageProps) {
  const { locale } = await params;
  const locale_id = (await LocalesApi.get({ search: locale, skip: 0, take: 1 })).data.items[0].id;
  return <Forms locale_id={locale_id} />;
}