import { getTranslations } from "next-intl/server";
import { Page } from "@/components/public/pages/terms";

export async function generateMetadata() {
  const t = await getTranslations('public.pages.terms.metadata');
  return {
    title: t('title'),
    description: t('description')
  }
}

export default async function page() {
  return <Page />
}