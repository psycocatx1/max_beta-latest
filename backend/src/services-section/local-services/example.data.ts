import {
  BaseListResult,
  Locale,
  LocalService,
  LocalItemDescription,
  Service,
} from "@lib/prisma";
import { example_service } from "../services/example.data";
import { example_locale } from "src/locales-section/locales/example.data";
import { example_local_item_description } from "src/shared-section/local-item-descriptions/example.data";

export const example_local_service: LocalService = {
  id: "UUID",
  name: "Service 1",
  description: "Description 1",
  price: 100,
  discount_price: 80,
  created: new Date(),
  updated: new Date(),
  service_id: "UUID",
  locale_id: "UUID",
  is_excluded: false,
};

export const example_local_services_list_result: BaseListResult<LocalService> =
  {
    items: [example_local_service],
    total: 1,
    skip: 0,
    take: 10,
  };

export type ExtendedLocalService = LocalService & {
  local_item_descriptions: LocalItemDescription[];
  service: Service;
  locale: Locale;
};

export const example_extended_local_service: ExtendedLocalService = {
  ...example_local_service,
  local_item_descriptions: [example_local_item_description],
  service: example_service,
  locale: example_locale,
};
