import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsUUID,
} from "class-validator";
import { Role } from "@prisma/client";
import { BaseFilterDto } from "../../../types/base-filter.dto";
import { Transform } from "class-transformer";

export class UserFiltersDto extends BaseFilterDto {
  @IsString()
  @IsEnum(Role)
  @ApiProperty({
    enum: Role,
    enumName: "Role",
    description: "Фильтрация по роли пользователя",
    required: false,
  })
  @IsOptional()
  role?: Role;

  @IsString()
  @ApiProperty({
    type: String,
    description: "Фильтрация по совпадению email",
    required: false,
  })
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: "Фильтрация по совпадению имени или фамилии",
    required: false,
  })
  search?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: "Фильтрация по совпадению номера телефона",
    required: false,
  })
  phone_number?: string;

  @IsString()
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    type: String,
    description: "Фильтрация по ID региона",
    required: false,
  })
  locale_id?: string;

  @Transform(({ value }) => value === "true")
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: "Является ли пользователь исключенным",
    example: false,
    required: false,
  })
  is_banned?: boolean = false;
}
