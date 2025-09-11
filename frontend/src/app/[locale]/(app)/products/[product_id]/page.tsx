import { ProductDetail } from "@/components/public/pages/product";
import { ExtendedProduct, getImageUrl, Locale, LocalesApi, ProductsApi } from "@/lib/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Params {
  params: Promise<{
    locale: string;
    product_id: string;
  }>
}

async function apiRequest({ params }: Params): Promise<{ locale: Locale, product: ExtendedProduct }> {
  const { locale, product_id } = await params;

  const locale_data = await LocalesApi.get({ symbol: locale.toUpperCase(), skip: 0, take: 1 });
  const locale_id = locale_data.data.items[0].id;
  try {
    const product = await ProductsApi.find(product_id, locale_id);
    if (!product.data) notFound();
    return {
      locale: locale_data.data.items[0],
      product: product.data,
    };

  } catch {
    notFound();
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { product } = await apiRequest({ params });
  const localProduct = product.local_products?.[0];
  const localName = localProduct?.name || product.name;
  const localDescription = localProduct?.description || product.description;

  return {
    title: localName,
    description: localDescription || undefined,
    openGraph: {
      title: localName,
      description: localDescription || undefined,
      images: [{
        url: getImageUrl(product.image) ?? ''
      }]
    }
  };
}

export default async function page({ params }: Params) {
  const { locale, product } = await apiRequest({ params });
  const { product_id } = await params;
  return <ProductDetail locale={locale} initial_product={product} product_id={product_id} />;
} 