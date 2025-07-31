import {
  BaseListResult,
  Locale,
  LocalProduct,
  LocalItemDescription,
  Product,
} from "@lib/prisma";
import { example_product } from "../products/example.data";
import { example_locale } from "src/locales-section/locales/example.data";
import { example_local_item_description } from "src/shared-section/local-item-descriptions/example.data";

export const example_local_product: LocalProduct = {
  id: "UUID",
  name: "Product 1",
  description: "Description 1",
  price: 100,
  discount_price: 80,
  created: new Date(),
  updated: new Date(),
  product_id: example_product.id,
  locale_id: example_locale.id,
  is_excluded: false,
};

export const example_local_products_list_result: BaseListResult<LocalProduct> =
  {
    items: [example_local_product],
    total: 1,
    skip: 0,
    take: 10,
  };

export type ExtendedLocalProduct = LocalProduct & {
  local_item_descriptions: LocalItemDescription[];
  product: Product;
  locale: Locale;
};

export const example_extended_local_product: ExtendedLocalProduct = {
  ...example_local_product,
  local_item_descriptions: [example_local_item_description],
  product: example_product,
  locale: example_locale,
};
