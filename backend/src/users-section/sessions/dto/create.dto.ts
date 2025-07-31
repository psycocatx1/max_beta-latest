import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSessionDto {
  @ApiProperty({ description: "IP адрес пользователя", example: "192.168.1.1" })
  @IsString()
  ip_address: string;

  @ApiProperty({
    description: "User Agent браузера/устройства",
    example: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  })
  @IsString()
  user_agent: string;

  @ApiProperty({ description: "ID пользователя", example: "uuid" })
  @IsString()
  user_id: string;
}
