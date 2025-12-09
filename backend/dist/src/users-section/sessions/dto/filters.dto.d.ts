import { BaseFilterDto } from "../../../types/base-filter.dto";
export declare class SessionFiltersDto extends BaseFilterDto {
    user_id?: string;
    is_active?: boolean;
    ip_address?: string;
    user_agent?: string;
}
