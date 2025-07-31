import { CategoryType, Locale } from "@prisma/client";

export interface ItemWithIssues {
  id: string;
  name: string;
  image: string;
  description: string;
  is_excluded: boolean;
  type?: CategoryType;
  missing_locales: Locale[];
}

export interface EntityValidationResult {
  total_items: number;
  missing_translations: number;
  items_with_issues: ItemWithIssues[];
}

export interface EntitiesValidationResult {
  products: EntityValidationResult;
  services: EntityValidationResult;
  categories: EntityValidationResult;
}

export type EntityType = "Product" | "Service" | "Category";
export type LocalType = "LocalProduct" | "LocalService" | "LocalCategory";

export const EntityType = {
  Product: "Product",
  Service: "Service",
  Category: "Category",
} as const;

export const LocalType = {
  LocalProduct: "LocalProduct",
  LocalService: "LocalService",
  LocalCategory: "LocalCategory",
} as const;
