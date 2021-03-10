import { Body, Controller, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { TranslationDto } from './dto/translation.dto'

@Controller('v1/translate')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('en-kr')
  translate(@Body() translationDto: TranslationDto) {
    return this.appService.koEnTranslate(translationDto)
  }
}
