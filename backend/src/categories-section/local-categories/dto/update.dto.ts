import { CreateCategoryDto } from "src/categories-section/categories";
import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateLocalCategoryDto extends PartialType(CreateCategoryDto) {
  @Type(() => Boolean)
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: "Исключена ли категория",
    required: false,
    example: false,
  })
  is_excluded?: boolean;
}
