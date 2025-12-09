import { BaseListResult } from "@lib/prisma";
import { ItemImage, LocalService, LocalItemDescription, Service, Category } from "@prisma/client";
export type ExtendedService = Service & {
    images: ItemImage[];
    category: Category;
    local_services: (LocalService & {
        local_item_descriptions: LocalItemDescription[];
    })[];
};
export declare const example_service: Service;
export declare const example_extended_service: ExtendedService;
export declare const example_extended_services_list_result: BaseListResult<ExtendedService>;
