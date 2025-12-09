import { CreateServiceDto } from "./create.dto";
declare const UpdateServiceDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateServiceDto>>;
export declare class UpdateServiceDto extends UpdateServiceDto_base {
    is_excluded?: boolean;
}
export {};
