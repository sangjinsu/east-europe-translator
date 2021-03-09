import { HttpService } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Papago } from 'src/translateBehavior/papago-translate'
import { Translator } from './translator'

export class KoEnPapago extends Translator {
  translateBehavior: Papago
  source: string
  target: string

  constructor(httpService: HttpService, configService: ConfigService) {
    super()
    this.translateBehavior = new Papago(httpService, configService)
    this.source = 'ko'
    this.target = 'en'
  }
}
