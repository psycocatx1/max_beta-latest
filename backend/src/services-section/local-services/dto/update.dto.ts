import { PartialType } from "@nestjs/swagger";
import { CreateLocalServiceDto } from "./create.dto";
import { Type } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateLocalServiceDto extends PartialType(CreateLocalServiceDto) {
  @Type(() => Boolean)
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: "Исключена ли услуга",
    required: false,
    example: false,
  })
  is_excluded?: boolean;
}
