import { BaseFilterDto } from "../../../types/base-filter.dto";
import { LocalItemDescriptionType } from "@prisma/client";
export declare class LocalItemDescriptionsFiltersDto extends BaseFilterDto {
    local_product_id?: string;
    local_service_id?: string;
    product_id?: string;
    service_id?: string;
    type?: LocalItemDescriptionType;
    is_excluded?: boolean;
}
