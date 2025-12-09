import { BaseFilterDto } from "../../../types/base-filter.dto";
export declare class ProductFiltersDto extends BaseFilterDto {
    category_id?: string;
    locale_id?: string;
    name?: string;
    description?: string;
    min_price?: number;
    max_price?: number;
    is_discounted?: boolean;
    is_excluded?: boolean;
}
