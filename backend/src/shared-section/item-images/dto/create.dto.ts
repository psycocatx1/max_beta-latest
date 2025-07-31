import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";
import { example_item_image } from "../example.data";
import { Transform } from "class-transformer";

export class CreateItemImageDto {
  @ApiProperty({
    description: "URL изображения или путь к файлу",
    example: example_item_image.image,
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: "ID продукта (если картинка принадлежит продукту)",
    required: false,
    example: example_item_image.product_id,
  })
  @IsOptional()
  @IsUUID()
  product_id?: string;

  @ApiProperty({
    description: "ID сервиса (если картинка принадлежит сервису)",
    required: false,
    example: example_item_image.service_id,
  })
  @IsOptional()
  @IsUUID()
  service_id?: string;

  @ApiProperty({
    description: "Исключена ли картинка из отображения",
    required: false,
    default: false,
    example: example_item_image.is_excluded,
  })
  @Transform(({ value }) => value === "true")
  @IsBoolean()
  @IsOptional()
  is_excluded?: boolean;
}
