import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({
    example: "user@example.com",
    description: "Email пользователя",
  })
  @IsEmail({}, { message: "Введите корректный email" })
  @IsNotEmpty({ message: "Email обязателен" })
  email: string;

  @ApiProperty({
    example: "password123",
    description: "Пароль пользователя",
  })
  @IsString({ message: "Пароль должен быть строкой" })
  @MinLength(6, { message: "Пароль должен содержать минимум 6 символов" })
  @IsNotEmpty({ message: "Пароль обязателен" })
  password: string;

  @ApiProperty({
    example: "Иван",
    description: "Имя пользователя",
    required: false,
  })
  @IsString({ message: "Имя должно быть строкой" })
  @IsOptional()
  first_name?: string;

  @ApiProperty({
    example: "Иванов",
    description: "Фамилия пользователя",
    required: false,
  })
  @IsString({ message: "Фамилия должна быть строкой" })
  @IsOptional()
  last_name?: string;

  @ApiProperty({
    example: "+79001234567",
    description: "Номер телефона пользователя",
    required: false,
  })
  @IsString({ message: "Номер телефона должен быть строкой" })
  @IsOptional()
  phone_number?: string;
}
