import { IsString, IsNotEmpty, Length } from 'class-validator'

export class TranslationDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 3000)
  text: string
}
