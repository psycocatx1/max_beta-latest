import { BaseFilterDto } from "../../../types/base-filter.dto";
export declare class LocalCategoryFiltersDto extends BaseFilterDto {
    search?: string;
    category_id?: string;
    locale_id?: string;
    is_excluded?: boolean;
}
