import {
  Product,
  ItemImage,
  LocalProduct,
  LocalItemDescription,
  Category,
} from "@prisma/client";
import { BaseListResult } from "@lib/prisma";

import { example_category } from "src/categories-section/categories/example.data";

export type ExtendedProduct = Product & {
  images: ItemImage[];
  local_products: (LocalProduct & {
    local_item_descriptions: LocalItemDescription[];
  })[];
  category: Category;
};

export const example_product: Product = {
  id: "UUID",
  name: "Example Product Name",
  description: "Description of the product for notes",
  price_USD: 100,
  discount_price_USD: 80,
  created: new Date(),
  updated: new Date(),
  category_id: "UUID",
  image: "https://example.com/image.jpg",
  is_excluded: false,
};

export const example_extended_product: ExtendedProduct = {
  ...example_product,
  images: [],
  local_products: [],
  category: example_category,
};

export const example_product_list_result: BaseListResult<ExtendedProduct> = {
  items: [example_extended_product],
  total: 1,
  skip: 0,
  take: 10,
};
