import { Body, Controller, Post } from '@nestjs/common'
import { AppService } from './app.service'

@Controller('v1/translate')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('en-kr')
  translate(@Body() dto: { text: string }) {
    const { text } = dto
    return this.appService.koEnTranslate(text)
  }
}
