import { Body, Controller, Post } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('papago/en-kr')
  translate(@Body() dto: { text: string }) {
    const { text } = dto
    return this.appService.koEnTranslate(text)
  }
}
