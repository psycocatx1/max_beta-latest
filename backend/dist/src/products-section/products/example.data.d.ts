import { Product, ItemImage, LocalProduct, LocalItemDescription, Category } from "@prisma/client";
import { BaseListResult } from "@lib/prisma";
export type ExtendedProduct = Product & {
    images: ItemImage[];
    local_products: (LocalProduct & {
        local_item_descriptions: LocalItemDescription[];
    })[];
    category: Category;
};
export declare const example_product: Product;
export declare const example_extended_product: ExtendedProduct;
export declare const example_product_list_result: BaseListResult<ExtendedProduct>;
