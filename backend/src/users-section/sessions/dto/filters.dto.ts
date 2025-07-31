import { BaseFilterDto } from "../../../types/base-filter.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsIP, IsOptional, IsString } from "class-validator";

export class SessionFiltersDto extends BaseFilterDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Идентификатор пользователя",
    example: "cmbi2oevc0000twkoc0a3nofo",
  })
  user_id?: string;

  @Transform(({ value }) => value === "true")
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: "Активна ли сессия",
    example: false,
    required: false,
  })
  is_active?: boolean;

  @IsIP()
  @IsString()
  @IsOptional()
  @ApiProperty({ description: "IP адрес сессии", example: "192.168.1.1" })
  ip_address?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "User Agent браузерa",
    example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  })
  user_agent?: string;
}
