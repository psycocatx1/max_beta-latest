import { BaseListResult, Locale, LocalService, LocalItemDescription, Service } from "@lib/prisma";
export declare const example_local_service: LocalService;
export declare const example_local_services_list_result: BaseListResult<LocalService>;
export type ExtendedLocalService = LocalService & {
    local_item_descriptions: LocalItemDescription[];
    service: Service;
    locale: Locale;
};
export declare const example_extended_local_service: ExtendedLocalService;
