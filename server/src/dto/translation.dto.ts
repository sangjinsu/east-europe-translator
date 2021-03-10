import { IsString, IsNotEmpty } from 'class-validator'

export class TranslationDto {
  @IsString()
  @IsNotEmpty()
  text: string
}
