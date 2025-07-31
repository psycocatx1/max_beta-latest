import { PartialType } from "@nestjs/swagger";
import { CreateLocalProductDto } from "./create.dto";
import { Type } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateLocalProductDto extends PartialType(CreateLocalProductDto) {
  @Type(() => Boolean)
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: "Исключено ли локальное описание",
    required: false,
    example: false,
  })
  is_excluded?: boolean;
}
