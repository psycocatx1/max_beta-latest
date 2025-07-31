import { ApiProperty } from "@nestjs/swagger";
import { Form } from "@prisma/client";
import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsEmail,
  Length,
} from "class-validator";
import { CreativeOmit } from "src/types/creative-omit.type";

export class CreateFormDto
  implements
    Omit<
      CreativeOmit<Form>,
      "is_read" | "is_answered" | "locale_id" | "ip_address"
    >
{
  @IsString()
  @Length(2, 1024)
  @IsNotEmpty()
  @ApiProperty({
    description: "Имя отправителя",
    minLength: 2,
    maxLength: 1024,
  })
  sender_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 1024)
  @ApiProperty({
    description: "Название компании",
    minLength: 2,
    maxLength: 1024,
  })
  company_name: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  @Length(2, 16)
  @ApiProperty({ description: "Номер телефона", minLength: 2, maxLength: 16 })
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Length(2, 256)
  @ApiProperty({ description: "Email", minLength: 2, maxLength: 256 })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 8192)
  @ApiProperty({ description: "Сообщение", minLength: 2, maxLength: 8192 })
  message: string;
}
