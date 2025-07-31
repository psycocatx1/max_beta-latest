import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsPositive,
  IsString,
  Min,
  IsOptional,
  MinLength,
  MaxLength,
  IsUUID,
  IsNotEmpty,
} from "class-validator";
import { Service } from "@lib/prisma";
import { Type } from "class-transformer";
/**
 * DTO для создания услуги
 */
export class CreateServiceDto implements Partial<Service> {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(512)
  @ApiProperty({
    description:
      "Название услуги для администратора (на сайте будет отображаться локальное название)",
    example: "Услуга 1",
    minLength: 3,
    maxLength: 512,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: "Категория услуги",
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
      "Цена услуги в USD (будет отображаться с конвертацией по курсу валюты при отсутствии локальных цен)",
    example: 100,
  })
  price_USD: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(0)
  @ApiProperty({
    description:
      "Скидочная цена услуги в USD (если не указана, то будет использоваться цена в USD)",
    example: 90,
  })
  discount_price_USD?: number;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(4096)
  @ApiProperty({
    description:
      "Описание услуги для заметок администратора (на сайте будут отображаться локальные описания)",
    example: "Описание услуги 1",
    minLength: 3,
    maxLength: 4096,
  })
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Главное изображение услуги",
    example: "https://example.com/image.jpg",
  })
  image?: string;
}
