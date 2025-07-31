import {
  IsBoolean,
  IsNumber,
  IsPositive,
  IsString,
  Min,
  IsOptional,
  IsUUID,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseFilterDto } from "../../../types/base-filter.dto";
import { Type, Transform } from "class-transformer";
import { example_product } from "src/products-section/products/example.data";
import { example_locale } from "src/locales-section/locales/example.data";

/**
 * Фильтры для локализаций продуктов
 */
export class LocalProductFiltersDto extends BaseFilterDto {
  @IsString()
  @IsOptional()
  @IsUUID()
  @ApiProperty({ description: "ID продукта", example: example_product.id })
  product_id?: string;

  @IsString()
  @IsOptional()
  @IsUUID()
  @ApiProperty({ description: "ID локали", example: example_locale.id })
  locale_id?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Min(0)
  @ApiProperty({ description: "Минимальная цена продукта", example: 0 })
  min_price?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Min(0)
  @ApiProperty({ description: "Максимальная цена продукта", example: 100000 })
  max_price?: number;

  @Transform(({ value }) => value == "true")
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: "Является ли продукт со скидкой",
    example: false,
    required: false,
  })
  is_discounted?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Название продукта",
    example: example_product.name,
  })
  name?: string;

  @Transform(({ value }) => value == "true")
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: "Является ли продукт исключенным",
    example: false,
    required: false,
  })
  is_excluded?: boolean = false;
}
