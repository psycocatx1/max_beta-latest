import {
  IsBoolean,
  IsBooleanString,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { BaseFilterDto } from "../../../types/base-filter.dto";
import { Form } from "@prisma/client";

export class FormsFiltersDto extends BaseFilterDto implements Partial<Form> {
  @IsOptional()
  @IsString()
  @Length(2, 1024)
  @ApiProperty({ description: "Поиск", required: false })
  search: string;

  @IsOptional()
  @IsBooleanString()
  @Transform(({ value }) => value === "true")
  @IsBoolean()
  @ApiProperty({ description: "Прочитано", required: false })
  is_read: boolean;

  @IsOptional()
  @IsBooleanString()
  @Transform(({ value }) => value === "true")
  @IsBoolean()
  @ApiProperty({ description: "Отвечено", required: false })
  is_answered: boolean;
}
