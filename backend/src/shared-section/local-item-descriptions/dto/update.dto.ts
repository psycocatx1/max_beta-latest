import { PartialType } from "@nestjs/swagger";
import { CreateLocalItemDescriptionDto } from "./create.dto";
import { Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateLocalItemDescriptionDto extends PartialType(
  CreateLocalItemDescriptionDto,
) {
  @Transform(({ value }) => value == "true")
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: "Исключено ли описание",
    required: false,
    example: false,
  })
  is_excluded?: boolean;

  @ApiProperty({
    description: "Порядок описания",
    required: false,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  order?: number;
}
