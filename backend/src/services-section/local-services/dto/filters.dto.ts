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
import { Type } from "class-transformer";
/**
 * Фильтры для локализаций услуг
 */
export class LocalServiceFiltersDto extends BaseFilterDto {
  @IsString()
  @IsOptional()
  @IsUUID()
  @ApiProperty({ description: "ID услуги", required: false })
  service_id?: string;

  @IsString()
  @IsOptional()
  @IsUUID()
  @ApiProperty({ description: "ID локализации", required: false })
  locale_id?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Min(0)
  @ApiProperty({
    description: "Минимальная цена локализованной услуги",
    required: false,
  })
  min_price?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Min(0)
  @ApiProperty({
    description: "Максимальная цена локализованной услуги",
    required: false,
  })
  max_price?: number;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: "Является ли локализованная услуга со скидкой",
    required: false,
  })
  is_discounted?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Название локализованной услуги",
    required: false,
  })
  name?: string;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: "Является ли локализованная услуга исключенной",
    required: false,
  })
  is_excluded?: boolean = false;
}
