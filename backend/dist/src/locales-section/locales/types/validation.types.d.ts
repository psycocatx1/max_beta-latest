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
export declare const EntityType: {
    readonly Product: "Product";
    readonly Service: "Service";
    readonly Category: "Category";
};
export declare const LocalType: {
    readonly LocalProduct: "LocalProduct";
    readonly LocalService: "LocalService";
    readonly LocalCategory: "LocalCategory";
};
