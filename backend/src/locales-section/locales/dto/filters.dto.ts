import { BaseFilterDto } from "../../../types/base-filter.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class LocaleFiltersDto extends BaseFilterDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    name: "Поиск",
    description:
      "Поиск по названию, языку, символу, валюте, символу валюты, коду телефона",
    example: "Россия",
    required: false,
  })
  search?: string;

  @Transform(({ value }) => value == "true")
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: "Является ли локаль исключенной",
    example: false,
    required: false,
  })
  is_excluded?: boolean;
}
