import { BaseListResult, ItemImage } from "@lib/prisma";

export const example_item_image: ItemImage = {
  id: "UUID",
  image: "https://example.com/image.jpg",
  is_excluded: false,
  created: new Date(),
  updated: new Date(),
  product_id: "UUID",
  service_id: "UUID",
};

export const example_item_images_list_result: BaseListResult<ItemImage> = {
  items: [example_item_image],
  total: 1,
  take: 10,
  skip: 0,
};
