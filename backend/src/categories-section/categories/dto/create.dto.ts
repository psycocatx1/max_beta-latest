import {
  IsString,
  IsOptional,
  IsEnum,
  MinLength,
  MaxLength,
} from "class-validator";
import { CategoryType } from "@lib/prisma";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @IsString()
  @MinLength(3)
  @MaxLength(512)
  @ApiProperty({
    description: "Название категории",
    example: "Категория 1",
    maxLength: 512,
    minLength: 3,
  })
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(4096)
  @ApiProperty({
    description: "Описание категории",
    example: "Описание категории 1",
    required: false,
    maxLength: 4096,
    minLength: 3,
  })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Ссылка на изображение категории",
    example: "https://example.com/image.jpg",
    required: false,
  })
  image?: string;

  @IsEnum(CategoryType)
  @ApiProperty({
    description: "Тип категории",
    enum: CategoryType,
    default: CategoryType.PRODUCT,
  })
  type: CategoryType;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: "ID родительской категории", required: false })
  parent_id?: string;
}
