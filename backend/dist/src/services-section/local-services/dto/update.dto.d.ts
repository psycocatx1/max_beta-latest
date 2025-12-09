import { CreateLocalServiceDto } from "./create.dto";
declare const UpdateLocalServiceDto_base: import("@nestjs/common").Type<Partial<CreateLocalServiceDto>>;
export declare class UpdateLocalServiceDto extends UpdateLocalServiceDto_base {
    is_excluded?: boolean;
}
export {};
