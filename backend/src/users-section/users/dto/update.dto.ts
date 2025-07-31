import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsUUID,
  IsNotEmpty,
  IsStrongPassword,
  IsEnum,
  IsBoolean,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { User, Role } from "@prisma/client";
import { Transform } from "class-transformer";

export class UpdateUserDto implements Partial<User> {
  @ApiProperty({
    example: "newpassword123",
    description: "Новый пароль пользователя",
    required: false,
  })
  @IsString({ message: "Пароль должен быть строкой" })
  @MinLength(8, { message: "Пароль должен содержать минимум 8 символов" })
  @IsNotEmpty({ message: "Пароль не может быть пустым" })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @IsOptional()
  password?: string;

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

  @ApiProperty({
    example: "https://example.com/avatar.jpg",
    description: "URL изображения профиля",
    required: false,
  })
  @IsString({ message: "URL изображения должен быть строкой" })
  @IsOptional()
  image?: string;

  @ApiProperty({
    example: "123e4567-e89b-12d3-a456-426614174000",
    description: "ID локали пользователя",
    required: false,
  })
  @IsUUID("all", { message: "ID локали должен быть UUID" })
  @IsOptional()
  locale_id?: string;
}

export class AdminUpdateUserDto extends UpdateUserDto {
  @ApiProperty({
    example: "user@example.com",
    description: "Email пользователя",
    required: false,
  })
  @IsEmail({}, { message: "Введите корректный email" })
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: "ADMIN",
    description: "Роль пользователя",
    required: false,
    enum: Role,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @ApiProperty({
    example: true,
    description: "Блокировка пользователя",
    required: false,
  })
  @Transform(({ value }) => value === "true")
  @IsBoolean()
  @IsOptional()
  is_banned?: boolean;
}
