import {
  IsString,
  IsOptional,
  IsEnum,
  IsUUID,
  IsBoolean,
} from "class-validator";
import { CategoryType } from "@lib/prisma";
import { BaseFilterDto } from "../../../types/base-filter.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CategoryFiltersDto extends BaseFilterDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: "Название категории", required: false })
  search?: string;

  @IsEnum(CategoryType)
  @IsOptional()
  @ApiProperty({
    description: "Тип категории",
    enum: CategoryType,
    required: false,
    default: CategoryType.PRODUCT,
  })
  type?: CategoryType;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: "ID родительской категории", required: false })
  parent_id?: string;

  @IsString()
  @IsOptional()
  @IsUUID()
  @ApiProperty({ description: "ID локализации", required: false })
  locale_id?: string;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: "Является ли категория исключенной",
    example: false,
  })
  is_excluded?: boolean = false;
}
