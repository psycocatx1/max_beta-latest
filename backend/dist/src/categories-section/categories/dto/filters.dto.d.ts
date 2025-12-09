import { CategoryType } from "@lib/prisma";
import { BaseFilterDto } from "../../../types/base-filter.dto";
export declare class CategoryFiltersDto extends BaseFilterDto {
    search?: string;
    type?: CategoryType;
    parent_id?: string;
    locale_id?: string;
    is_excluded?: boolean;
}
