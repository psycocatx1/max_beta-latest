import { NotFound } from "@/components/public/pages/not-found/NotFound";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PackageX } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const tMetadata = await getTranslations('public.pages.product.not_found');

  return {
    title: `${tMetadata.has('title') ? tMetadata('title') : 'Product not found'}`,
    description: tMetadata.has('description') ? tMetadata('description') : 'Unfortunately, the requested product was not found. It may have been removed, moved, or never existed.',
    robots: 'noindex, nofollow'
  };
}

export default async function ProductNotFoundPage() {
  return <NotFound icon={<PackageX size={120} />} item="product" goTo="products" />;
}
