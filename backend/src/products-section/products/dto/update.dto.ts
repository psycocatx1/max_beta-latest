import { CreateProductDto } from "./create.dto";
import { PartialType } from "@nestjs/mapped-types";
import { Transform } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @Transform(({ value }) => value == "true")
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: "Исключен ли продукт",
    required: false,
    example: false,
  })
  is_excluded?: boolean;
}
