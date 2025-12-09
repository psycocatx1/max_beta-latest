import { CreateLocalItemDescriptionDto } from "./create.dto";
declare const UpdateLocalItemDescriptionDto_base: import("@nestjs/common").Type<Partial<CreateLocalItemDescriptionDto>>;
export declare class UpdateLocalItemDescriptionDto extends UpdateLocalItemDescriptionDto_base {
    is_excluded?: boolean;
    order?: number;
}
export {};
