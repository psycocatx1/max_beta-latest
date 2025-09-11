import { ExtendedService, ItemImage, Locale, LocalItemDescription } from "@/lib/api"

export interface LocalizedService {
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

export const formatExtendedService = (service: ExtendedService, locale: Locale): LocalizedService => {
  const local_service = service.local_services?.[0];

  const price = local_service?.price || service.price_USD;
  const discount_price = local_service?.discount_price || service.discount_price_USD;

  const is_discounted = !!discount_price && discount_price < price;
  const discount_percentage = discount_price ? (price - discount_price) / price * 100 : 0;

  const formatted_price = `${price.toFixed(2)} ${local_service.price ? locale.currency_symbol : '$'}`;
  const formatted_discount_price = !is_discounted ? null : `${discount_price?.toFixed(2)} ${local_service.discount_price ? locale.currency_symbol : '$'}`;


  return {
    id: service.id,
    name: service.local_services?.[0]?.name || service.name,
    description: service.local_services?.[0]?.description || service.description,
    price: price,
    discount_price: discount_price,
    discount_percentage: discount_percentage,
    is_discounted: is_discounted,
    formatted_price: formatted_price,
    formatted_discount_price: formatted_discount_price,
    images: [mainImageToItemImage(service), ...service.images],
    item_descriptions: service.local_services?.[0]?.local_item_descriptions || [],
  }
}

const mainImageToItemImage = (service: ExtendedService): ItemImage => {
  return {
    image: service.image,
    id: service.id,
    is_excluded: service.is_excluded,
    created: service.created,
    updated: service.updated,
    product_id: null,
    service_id: service.id,
  }
}