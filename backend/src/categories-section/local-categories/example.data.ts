import { LocalCategory, BaseListResult, Category, Locale } from "@lib/prisma";
import { example_locale } from "src/locales-section/locales/example.data";
import { example_category } from "..";

export const example_local_category: LocalCategory = {
  description: "Локализованное описание категории",
  name: "Название категории",
  id: "123e4567-e89b-12d3-a456-426614174000",
  created: new Date(),
  updated: new Date(),
  category_id: "123e4567-e89b-12d3-a456-426614174000",
  locale_id: example_locale.id,
  is_excluded: false,
};

export type ExtendedLocalCategory = LocalCategory & {
  category: Category;
  locale: Locale;
};

export const example_extended_local_category: ExtendedLocalCategory = {
  ...example_local_category,
  category: example_category,
  locale: example_locale,
};

export const example_local_categories_list_result: BaseListResult<LocalCategory> =
  {
    items: [example_local_category],
    total: 1,
    skip: 0,
    take: 10,
  };
