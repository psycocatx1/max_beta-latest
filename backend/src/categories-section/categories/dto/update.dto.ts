import { CreateCategoryDto } from "./create.dto";
import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
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
