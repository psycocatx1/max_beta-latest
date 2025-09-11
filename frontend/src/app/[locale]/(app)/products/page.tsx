import { Products } from "@/components/public/pages/products/Products";
import { ExtendedProduct, getImageUrl, Locale, LocalesApi, ProductsApi } from "@/lib/api";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface Params { params: Promise<{ locale: string }> }

async function apiRequest({ params }: Params): Promise<{ locale: Locale, initial_products: ExtendedProduct[] }> {
  const { locale } = await params;

  const locale_data = await LocalesApi.get({ symbol: locale.toUpperCase(), skip: 0, take: 1 });
  const locale_id = locale_data.data.items[0].id

  const products_data = await ProductsApi.get({ skip: 0, take: 1000, locale_id });
  const initial_products = products_data.data.items
  return {
    locale: locale_data.data.items[0],
    initial_products
  }
}


export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { initial_products } = await apiRequest({ params });
  const tMetadata = await getTranslations('public.pages.products.metadata')

  return {
    title: tMetadata(`title`),
    description: tMetadata(`description`),
    openGraph: {
      title: tMetadata(`title`),
      description: tMetadata(`description`),
      images: [{
        url: getImageUrl(initial_products[0].image) || ''
      }]
    }
  }
}

export default async function page({ params }: Params) {
  const { locale, initial_products } = await apiRequest({ params });
  return <Products locale={locale} initial_products={initial_products} />
}