import { BaseFilterDto } from "../../../types/base-filter.dto";
export declare class ServiceFiltersDto extends BaseFilterDto {
    category_id?: string;
    name?: string;
    description?: string;
    min_price?: number;
    max_price?: number;
    is_discounted?: boolean;
    locale_id?: string;
    is_excluded?: boolean;
}
