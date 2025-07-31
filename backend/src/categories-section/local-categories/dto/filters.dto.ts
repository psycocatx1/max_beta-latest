import { IsString, IsOptional, IsUUID, IsBoolean } from "class-validator";
import { BaseFilterDto } from "../../../types/base-filter.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class LocalCategoryFiltersDto extends BaseFilterDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Поиск по названию",
    example: "Перевод категории 1",
  })
  search?: string;

  @IsString()
  @IsOptional()
  @IsUUID("all", { each: false, always: false })
  @ApiProperty({
    description: "ID категории",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  category_id?: string;

  @IsString()
  @IsOptional()
  @IsUUID("all", { each: false, always: false })
  @ApiProperty({
    description: "ID локализации",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  locale_id?: string;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: "Является ли перевод категории исключенным",
    example: false,
  })
  is_excluded?: boolean = false;
}
