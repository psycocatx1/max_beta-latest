import { Locale, BaseListResult } from "@lib/prisma";

export const example_locale: Locale = {
  id: "UUID",
  name: "Россия",
  language: "Русский",
  symbol: "RU",
  currency: "Рубль",
  currency_symbol: "₽",
  phone_code: "+7",
  image: "https://example.com/icon.png",
  is_excluded: false,
  created: new Date(),
  updated: new Date(),
};

export const example_locales_list_result: BaseListResult<Locale> = {
  items: [example_locale],
  total: 1,
  take: 10,
  skip: 0,
};
