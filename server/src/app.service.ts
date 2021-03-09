import { HttpService, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { KoEnPapago } from './translator/ko-en-papago'

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  koEnTranslate(text: string) {
    const papago = new KoEnPapago(this.httpService, this.configService)
    return papago.performTranslate(text)
  }
}
