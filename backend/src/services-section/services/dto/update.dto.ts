import { CreateServiceDto } from "./create.dto";
import { PartialType } from "@nestjs/mapped-types";
import { Transform } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @Transform(({ value }) => value == "true")
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: "Исключена ли услуга",
    required: false,
    example: false,
  })
  is_excluded?: boolean;
}
