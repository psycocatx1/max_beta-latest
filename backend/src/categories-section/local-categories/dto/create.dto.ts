import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsUUID,
} from "class-validator";

export class CreateLocalCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty({
    description: "Перевод категории",
    example: "Перевод категории 1",
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Описание категории",
    example: "Описание категории 1",
    required: false,
  })
  description?: string;

  @IsString()
  @IsUUID()
  @ApiProperty({
    description: "ID категории",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  category_id: string;

  @IsString()
  @IsUUID()
  @ApiProperty({
    description: "ID локализации",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  locale_id: string;
}
