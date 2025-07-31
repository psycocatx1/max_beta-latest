import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Min,
} from "class-validator";
import { BaseFilterDto } from "../../../types/base-filter.dto";
import { Transform, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class ProductFiltersDto extends BaseFilterDto {
  @IsString()
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: "ID категории",
    example: "123e4567-e89b-12d3-a456-426614174000",
    required: false,
  })
  category_id?: string;

  @IsString()
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: "ID локали",
    example: "123e4567-e89b-12d3-a456-426614174000",
    required: false,
  })
  locale_id?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Название продукта",
    example: "Продукт 1",
    required: false,
  })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Описание продукта",
    example: "Описание продукта 1",
    required: false,
  })
  description?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Min(0)
  @ApiProperty({
    description: "Минимальная цена продукта",
    example: 1,
    required: false,
  })
  min_price?: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Min(0)
  @IsOptional()
  @ApiProperty({
    description: "Максимальная цена продукта",
    example: 100000,
    required: false,
  })
  max_price?: number;

  @Transform(({ value }) => value === "true")
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: "Является ли продукт со скидкой",
    example: false,
    required: false,
  })
  is_discounted?: boolean;

  @Transform(({ value }) => value === "true")
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: "Является ли продукт исключенным",
    example: false,
    required: false,
  })
  is_excluded?: boolean = false;
}
