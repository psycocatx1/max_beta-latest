import { PartialType } from "@nestjs/swagger";
import { CreateItemImageDto } from "./create.dto";
import { Transform } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateItemImageDto extends PartialType(CreateItemImageDto) {
  @Transform(({ value }) => value == "true")
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: "Исключена ли картинка",
    required: false,
    example: false,
  })
  is_excluded?: boolean;
}
