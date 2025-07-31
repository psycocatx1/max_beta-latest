import { PartialType } from "@nestjs/mapped-types";
import { CreateLocaleDto } from "./create.dto";
import { Type } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateLocaleDto extends PartialType(CreateLocaleDto) {
  @Type(() => Boolean)
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: "Исключена ли локализация",
    required: false,
    example: false,
  })
  is_excluded?: boolean;
}
