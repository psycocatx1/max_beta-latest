import { About } from "@/components/public/pages/about";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations('public.pages.about.metadata');
  return {
    title: t('title'),
    description: t('description')
  }
}

export default async function page() {
  return <About />
}