import { BaseListResult } from "@lib/prisma";
import {
  ItemImage,
  LocalService,
  LocalItemDescription,
  Service,
} from "@prisma/client";
import { example_item_image } from "src/shared-section/item-images/example.data";
import { example_extended_local_service } from "../local-services/example.data";

export type ExtendedService = Service & {
  images: ItemImage[];
  local_services: (LocalService & {
    local_item_descriptions: LocalItemDescription[];
  })[];
};

export const example_service: Service = {
  id: "UUID",
  name: "Example Service Name",
  description: "Description of the service for notes",
  price_USD: 100,
  discount_price_USD: 80,
  created: new Date(),
  updated: new Date(),
  category_id: "UUID",
  is_excluded: false,
  image: "https://example.com/image.jpg",
};

export const example_extended_service: ExtendedService = {
  ...example_service,
  images: [example_item_image],
  local_services: [example_extended_local_service],
};

export const example_extended_services_list_result: BaseListResult<ExtendedService> =
  {
    items: [example_extended_service],
    total: 1,
    skip: 0,
    take: 10,
  };
