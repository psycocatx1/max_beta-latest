import { ExtendedProduct, ItemImage, Locale, LocalItemDescription } from "@/lib/api"

export interface LocalizedProduct {
  id: string,
  name: string,
  description: string | null,
  price: number,
  discount_price: number | null,
  discount_percentage: number,
  is_discounted: boolean,
  formatted_price: string,
  formatted_discount_price: string | null,
  images: ItemImage[],
  item_descriptions: LocalItemDescription[],
}

export const formatExtendedProduct = (product: ExtendedProduct, locale: Locale): LocalizedProduct => {
  const local_product = product.local_products?.[0];

  const price = local_product?.price || product.price_USD;
  const discount_price = local_product?.discount_price || product.discount_price_USD;

  const discount_percentage = discount_price ? (price - discount_price) / price * 100 : 0;
  const is_discounted = !!discount_price && discount_price < price;

  const formatted_price = `${price.toFixed(2)} ${local_product.price ? locale.currency_symbol : '$'}`;
  const formatted_discount_price = !is_discounted ? null : `${discount_price?.toFixed(2)} ${local_product.discount_price ? locale.currency_symbol : '$'}`;


  return {
    id: product.id,
    name: product.local_products?.[0]?.name || product.name,
    description: product.local_products?.[0]?.description || product.description,
    price: price,
    discount_price: discount_price,
    discount_percentage: discount_percentage,
    is_discounted: is_discounted,
    formatted_price: formatted_price,
    formatted_discount_price: formatted_discount_price,
    images: [mainImageToItemImage(product), ...product.images],
    item_descriptions: product.local_products?.[0]?.local_item_descriptions || [],
  }
}

const mainImageToItemImage = (product: ExtendedProduct): ItemImage => {
  return {
    image: product.image,
    id: product.id,
    is_excluded: product.is_excluded,
    created: product.created,
    updated: product.updated,
    product_id: null,
    service_id: product.id,
  }
}