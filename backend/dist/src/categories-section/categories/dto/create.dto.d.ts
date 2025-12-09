import { CategoryType } from "@lib/prisma";
export declare class CreateCategoryDto {
    name: string;
    description?: string;
    image?: string;
    type: CategoryType;
    parent_id?: string;
}
