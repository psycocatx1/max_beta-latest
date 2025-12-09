import { BaseFilterDto } from "../../../types/base-filter.dto";
export declare class LocalProductFiltersDto extends BaseFilterDto {
    product_id?: string;
    locale_id?: string;
    min_price?: number;
    max_price?: number;
    is_discounted?: boolean;
    name?: string;
    is_excluded?: boolean;
}
