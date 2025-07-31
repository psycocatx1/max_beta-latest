import { TranslationModuleType, UserFiltersDto, LocaleFiltersDto, ProductFiltersDto, ServiceFiltersDto, CategoryFiltersDto, ItemImagesFiltersDto, LocalProductFiltersDto, LocalServiceFiltersDto, LocalCategoryFiltersDto, LocalItemDescriptionsFiltersDto } from "@/lib/api";
import { FormsFiltersDto } from "@lib/api/services/types/forms.types";
import { Prisma } from "@prisma/client";

export const QUERY_KEYS = {
  locales: (filters?: LocaleFiltersDto) => ['locales', filters],
  locale: (id: string) => ['locale', id],
  validate_entities: () => ['validate_entities'],
  categories: (filters?: CategoryFiltersDto) => ['categories', filters],
  category: (id: string) => ['category', id],
  local_categories: (filters?: Partial<LocalCategoryFiltersDto>) => ['local_categories', filters],
  local_category: (id: string) => ['local_category', id],
  products: (filters?: ProductFiltersDto) => ['products', filters],
  product: (id: string) => ['product', id],
  local_products: (filters?: LocalProductFiltersDto) => ['local_products', filters],
  local_product: (id: string) => ['local_product', id],
  services: (filters?: ServiceFiltersDto) => ['services', filters],
  service: (id: string) => ['service', id],
  local_services: (filters?: LocalServiceFiltersDto) => ['local_services', filters],
  local_service: (id: string) => ['local_service', id],
  item_images: (filters?: ItemImagesFiltersDto) => ['item_images', filters],
  item_image: (id: string) => ['item_image', id],
  local_item_descriptions: (filters?: LocalItemDescriptionsFiltersDto) => ['local_item_descriptions', filters],
  local_item_description: (id: string) => ['local_item_description', id],
  account: () => ['account'],
  users: (filters?: UserFiltersDto) => ['users', filters],
  user: (where: Prisma.UserWhereUniqueInput) => ['user', where],
  sessions: (user_id: string) => ['sessions', user_id],
  messages: (locale_symbol: string, modules?: TranslationModuleType[]) => ['messages', locale_symbol, modules],
  translations: (locale_symbol?: string, module?: TranslationModuleType) => ['translations', locale_symbol, module],
  translations_validation: () => ['translations_validation'],
  forms: (filters?: FormsFiltersDto) => ['forms', filters],
  form: (id: string) => ['form', id]
}