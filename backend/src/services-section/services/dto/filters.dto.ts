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
import { Type, Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class ServiceFiltersDto extends BaseFilterDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: "Идентификатор категории услуги",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  category_id?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "Название услуги", example: "Услуга 1" })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "Описание услуги", example: "Описание услуги 1" })
  description?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Min(0)
  @ApiProperty({ description: "Минимальная цена услуги", example: 0 })
  min_price?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Min(0)
  @ApiProperty({ description: "Максимальная цена услуги", example: 100000 })
  max_price?: number;

  @Transform(({ value }) => value === "true")
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: "Является ли услуга со скидкой",
    example: false,
    required: false,
  })
  is_discounted?: boolean;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: "Идентификатор локали",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  locale_id?: string;

  @Transform(({ value }) => value === "true")
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: "Является ли услуга исключенной",
    example: false,
    required: false,
  })
  is_excluded?: boolean = false;
}
