import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
  IsNotEmpty,
  IsUUID,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { LocalService } from "@lib/prisma";
import { Type } from "class-transformer";
/**
 * DTO для создания локализованной услуги
 */
export class CreateLocalServiceDto implements Partial<LocalService> {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(512)
  @ApiProperty({
    description: "Название услуги",
    example: "Услуга 1",
    maxLength: 512,
    minLength: 3,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(4096)
  @ApiProperty({
    description: "Описание услуги",
    example: "Описание услуги 1",
    maxLength: 4096,
    minLength: 3,
  })
  description: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(0)
  @ApiProperty({ description: "Цена услуги", example: 100 })
  price: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Min(0)
  @ApiProperty({
    description: "Цена услуги с учетом скидки",
    example: 90,
    required: false,
  })
  discount_price?: number;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: "ID локализации",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  locale_id: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: "ID услуги",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  service_id: string;
}
