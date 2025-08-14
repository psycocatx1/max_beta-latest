import { Page } from "@/components/public/pages/privacy";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations('public.pages.privacy.metadata');
  return {
    title: t('title'),
    description: t('description')
  }
}

export default async function page() {
  return <Page />
}