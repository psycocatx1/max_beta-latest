import { LocalItemDescriptionType } from "@lib/prisma";
export declare class CreateLocalItemDescriptionDto {
    content: string;
    title?: string;
    type: LocalItemDescriptionType;
    local_product_id?: string;
    local_service_id?: string;
    is_excluded?: boolean;
}
