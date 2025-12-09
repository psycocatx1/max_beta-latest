import { CreateLocaleDto } from "./create.dto";
declare const UpdateLocaleDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateLocaleDto>>;
export declare class UpdateLocaleDto extends UpdateLocaleDto_base {
    is_excluded?: boolean;
}
export {};
