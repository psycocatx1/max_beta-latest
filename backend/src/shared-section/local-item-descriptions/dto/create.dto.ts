import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from "class-validator";
import { IsNotEmpty } from "class-validator";
import { example_local_item_description } from "../example.data";
import { LocalItemDescriptionType } from "@lib/prisma";
import { Transform } from "class-transformer";

export class CreateLocalItemDescriptionDto {
  @ApiProperty({
    description: "Содержимое описания (текст или URL изображения)",
    example: example_local_item_description.content,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2048)
  content: string;

  @ApiProperty({
    description: "Заголовок описания",
    required: false,
    example: example_local_item_description.title,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(256)
  title: string;

  @ApiProperty({
    description: "Тип описания",
    enum: LocalItemDescriptionType,
    required: false,
    example: example_local_item_description.type,
  })
  @IsEnum(LocalItemDescriptionType)
  @IsNotEmpty()
  type: LocalItemDescriptionType;

  @ApiProperty({
    description: "ID локального продукта (если описание принадлежит продукту)",
    required: false,
    example: example_local_item_description.local_product_id,
  })
  @IsOptional()
  @IsUUID()
  local_product_id?: string;

  @ApiProperty({
    description: "ID локального сервиса (если описание принадлежит сервису)",
    required: false,
    example: example_local_item_description.local_service_id,
  })
  @IsOptional()
  @IsUUID()
  local_service_id?: string;

  @Transform(({ value }) => value === "true")
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: "Исключено ли описание из отображения",
    required: false,
    default: false,
    example: example_local_item_description.is_excluded,
  })
  is_excluded?: boolean;
}
