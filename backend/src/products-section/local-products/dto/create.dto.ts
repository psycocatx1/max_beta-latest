import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";
import { IsUUID } from "class-validator";
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { example_product } from "../../products/example.data";
import { example_locale } from "src/locales-section/locales/example.data";
/**
 * DTO для создания локали продукта
 */
export class CreateLocalProductDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ description: "ID продукта", example: example_product.id })
  product_id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty({
    description: "Название продукта",
    example: example_product.name,
  })
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(2048)
  @ApiProperty({
    description: "Описание продукта",
    example: example_product.description,
  })
  description?: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(0)
  @ApiProperty({
    description: "Цена продукта",
    example: example_product.price_USD,
  })
  price: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Min(0)
  @ApiProperty({
    description: "Цена продукта",
    example: example_product.discount_price_USD,
  })
  discount_price?: number;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ description: "ID локализации", example: example_locale.id })
  locale_id: string;
}
