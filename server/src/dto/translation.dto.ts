import { IsString, IsNotEmpty, Length } from 'class-validator'

export class TranslationDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 1000)
  text: string
}
