import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
} from "class-validator";
import { Locale } from "@lib/prisma";

export class CreateLocaleDto implements Partial<Locale> {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(512)
  @ApiProperty({
    name: "Название",
    description: "Название региона локализации",
    example: "Россия",
    maxLength: 512,
    minLength: 2,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(512)
  @ApiProperty({
    name: "Язык",
    description: "Язык региона локализации",
    example: "Русский",
    maxLength: 512,
    minLength: 2,
  })
  language: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(3)
  @Matches(/^[A-Z]{2,3}$/)
  @ApiProperty({
    name: "Символ",
    description: "Символ региона локализации",
    example: "RU",
    maxLength: 3,
    minLength: 2,
  })
  symbol: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(512)
  @ApiProperty({
    name: "Валюта",
    description: "Валюта региона локализации",
    example: "Рубль",
    maxLength: 512,
    minLength: 2,
  })
  currency: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(4)
  @ApiProperty({
    name: "Символ валюты",
    description: "Символ валюты региона локализации",
    example: "₽",
    maxLength: 4,
    minLength: 1,
  })
  currency_symbol: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(5)
  @Matches(/^\+[0-9]{1,5}$/)
  @ApiProperty({
    name: "Код телефона",
    description: "Код телефона региона локализации",
    example: "+7",
    maxLength: 5,
    minLength: 1,
  })
  phone_code: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: "Изображение",
    description: "Изображение региона локализации",
    example: "https://example.com/image.png",
    required: false,
  })
  image?: string;
}
