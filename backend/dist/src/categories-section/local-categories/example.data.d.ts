import { LocalCategory, BaseListResult, Category, Locale } from "@lib/prisma";
export declare const example_local_category: LocalCategory;
export type ExtendedLocalCategory = LocalCategory & {
    category: Category;
    locale: Locale;
};
export declare const example_extended_local_category: ExtendedLocalCategory;
export declare const example_local_categories_list_result: BaseListResult<LocalCategory>;
