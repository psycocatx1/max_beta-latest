import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsUUID } from "class-validator";
import { example_item_image } from "../example.data";
import { BaseFilterDto } from "../../../types/base-filter.dto";
import { Type } from "class-transformer";

export class ItemImagesFiltersDto extends BaseFilterDto {
  @ApiProperty({
    description: "ID продукта для фильтрации",
    required: false,
    example: example_item_image.product_id,
  })
  @IsOptional()
  @IsUUID()
  product_id?: string;

  @ApiProperty({
    description: "ID сервиса для фильтрации",
    required: false,
    example: example_item_image.service_id,
  })
  @IsOptional()
  @IsUUID()
  service_id?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @ApiProperty({
    description: "Удаленные картинки",
    required: false,
    example: false,
  })
  is_excluded?: boolean;
}
