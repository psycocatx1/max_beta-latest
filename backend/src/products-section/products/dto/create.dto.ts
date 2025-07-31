import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsNumber,
  IsPositive,
  IsString,
  Min,
  IsOptional,
  MinLength,
  MaxLength,
  IsUUID,
} from "class-validator";
import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(512)
  @ApiProperty({
    description:
      "Название продукта для администратора (на сайте будет отображаться локальное название)",
    example: "Продукт 1",
    maxLength: 512,
    minLength: 3,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: "Категория продукта",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  category_id: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(0)
  @ApiProperty({
    description:
      "Цена продукта в USD (будет отображаться с конвертацией по курсу валюты при отсутствии локальных цен)",
  })
  price_USD: number;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => {
    if (value) {
      const number = Number(value);
      return number > 0 ? number : null;
    }
    return null;
  })
  @ApiProperty({
    description:
      "Скидочная цена продукта в USD (если не указана, то будет использоваться цена в USD)",
  })
  discount_price_USD?: number;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(4096)
  @ApiProperty({
    description:
      "Описание продукта для заметок администратора (на сайте будут отображаться локальные описания)",
    example: "Описание продукта 1",
    maxLength: 4096,
    minLength: 3,
  })
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Главное изображение продукта",
    required: false,
    example: "https://example.com/image.jpg",
  })
  image?: string;
}
