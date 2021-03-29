import { Body, Controller, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { TranslationDto } from './dto/translation.dto'

@Controller('v1/translate')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('ko-en')
  koEnTranslate(@Body() translationDto: TranslationDto) {
    return this.appService.koEnTranslate(translationDto)
  }

  @Post('en-ro')
  enRoTranslate(@Body() translationDto: TranslationDto) {
    return this.appService.enRoTranslate(translationDto)
  }

  @Post('en-uk')
  enUkTranslate(@Body() translationDto: TranslationDto) {
    return this.appService.enUkTranslate(translationDto)
  }
}
