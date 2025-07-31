import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
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
}
