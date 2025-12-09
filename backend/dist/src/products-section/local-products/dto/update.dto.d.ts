import { CreateLocalProductDto } from "./create.dto";
declare const UpdateLocalProductDto_base: import("@nestjs/common").Type<Partial<CreateLocalProductDto>>;
export declare class UpdateLocalProductDto extends UpdateLocalProductDto_base {
    is_excluded?: boolean;
}
export {};
