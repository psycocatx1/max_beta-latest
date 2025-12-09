import { CreateCategoryDto } from "src/categories-section/categories";
declare const UpdateLocalCategoryDto_base: import("@nestjs/common").Type<Partial<CreateCategoryDto>>;
export declare class UpdateLocalCategoryDto extends UpdateLocalCategoryDto_base {
    is_excluded?: boolean;
}
export {};
