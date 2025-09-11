import { NotFound } from "@/components/public/pages/not-found/NotFound";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { FileX2 } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const tMetadata = await getTranslations('public.pages.service.not_found');

  return {
    title: `${tMetadata.has('title') ? tMetadata('title') : 'Service not found'}`,
    description: tMetadata.has('description') ? tMetadata('description') : 'Unfortunately, the requested service was not found. It may have been removed, moved, or never existed.',
    robots: 'noindex, nofollow'
  };
}

export default async function ServiceNotFoundPage() {
  return <NotFound icon={<FileX2 size={120} />} item="service" goTo="services" />;
}
