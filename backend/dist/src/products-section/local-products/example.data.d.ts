import { BaseListResult, Locale, LocalProduct, LocalItemDescription, Product } from "@lib/prisma";
export declare const example_local_product: LocalProduct;
export declare const example_local_products_list_result: BaseListResult<LocalProduct>;
export type ExtendedLocalProduct = LocalProduct & {
    local_item_descriptions: LocalItemDescription[];
    product: Product;
    locale: Locale;
};
export declare const example_extended_local_product: ExtendedLocalProduct;
