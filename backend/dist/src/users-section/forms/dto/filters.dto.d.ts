import { BaseFilterDto } from "../../../types/base-filter.dto";
import { Form } from "@prisma/client";
export declare class FormsFiltersDto extends BaseFilterDto implements Partial<Form> {
    search: string;
    is_read: boolean;
    is_answered: boolean;
}
