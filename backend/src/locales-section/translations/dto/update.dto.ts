import { IsObject, IsNotEmpty } from "class-validator";

export class UpdateTranslationDto {
  @IsObject()
  @IsNotEmpty()
  translations: Record<string, any>;
}
