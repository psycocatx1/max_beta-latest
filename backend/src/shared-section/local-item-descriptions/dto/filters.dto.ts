import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsOptional, IsUUID } from "class-validator";
import { BaseFilterDto } from "../../../types/base-filter.dto";
import { LocalItemDescriptionType } from "@prisma/client";
import { Type } from "class-transformer";

export class LocalItemDescriptionsFiltersDto extends BaseFilterDto {
  @ApiProperty({
    description: "ID локального продукта для фильтрации",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  local_product_id?: string;

  @ApiProperty({
    description: "ID локального сервиса для фильтрации",
    required: false,
  })
  @IsOptional()
  @IsUUID()
  local_service_id?: string;

  @ApiProperty({ description: "ID продукта для фильтрации", required: false })
  @IsOptional()
  @IsUUID()
  product_id?: string;

  @ApiProperty({ description: "ID сервиса для фильтрации", required: false })
  @IsOptional()
  @IsUUID()
  service_id?: string;

  @ApiProperty({
    description: "Тип описания",
    required: false,
    enum: LocalItemDescriptionType,
  })
  @IsOptional()
  @IsEnum(LocalItemDescriptionType)
  type?: LocalItemDescriptionType;

  @ApiProperty({
    description: "Исключены ли описания",
    required: false,
    example: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  is_excluded?: boolean = false;
}
