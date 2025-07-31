import { BaseListResult, LocalItemDescription } from "@lib/prisma";

export const example_local_item_description: LocalItemDescription = {
  id: "UUID",
  content: "Example local item description content",
  title: "Example Title",
  type: "TEXT",
  created: new Date(),
  order: 1,
  updated: new Date(),
  local_product_id: "UUID",
  local_service_id: "UUID",
  is_excluded: false,
};

export const example_local_item_descriptions_list_result: BaseListResult<LocalItemDescription> =
  {
    items: [example_local_item_description],
    total: 1,
    skip: 0,
    take: 10,
  };
