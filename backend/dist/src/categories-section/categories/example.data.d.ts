import { Category, BaseListResult, LocalCategory, Product, Service } from "@lib/prisma";
export declare const example_category: Category;
export type ExtendedCategory = Category & {
    parent: Category | null;
    children: CategoryWithCounts[];
    ancestors: CategoryWithCounts[];
    products: Product[];
    services: Service[];
    local_categories: LocalCategory[];
};
export type CategoryWithCounts = Category & {
    _count: {
        products: number;
        services: number;
    };
    children?: CategoryWithCounts[];
    local_categories?: LocalCategory[];
};
export declare const example_extended_category: ExtendedCategory;
export declare const example_categories_list_result: BaseListResult<CategoryWithCounts>;
