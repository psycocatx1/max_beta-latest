import { Role } from "@prisma/client";
import { BaseFilterDto } from "../../../types/base-filter.dto";
export declare class UserFiltersDto extends BaseFilterDto {
    role?: Role;
    email?: string;
    search?: string;
    phone_number?: string;
    locale_id?: string;
    is_banned?: boolean;
}
