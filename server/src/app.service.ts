import { HttpService, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Kakao } from './translateBehavior/kakao-translate'
import { Papago } from './translateBehavior/papago-translate'

import { KoEnTranslator } from './translator/ko-en-translator'

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async koEnTranslate(text: string) {
    const papago = new KoEnTranslator(
      new Papago(this.httpService, this.configService),
    )

    const kakao = new KoEnTranslator(
      new Kakao(this.httpService, this.configService),
    )
    kakao.performTranslate(text)

    const translatedTexts = await Promise.allSettled([
      papago.performTranslate(text),
      kakao.performTranslate(text),
    ]).then((results) =>
      results.map((result) => {
        if (result.status === 'fulfilled') {
          return result.value
        }
      }),
    )
    return { result: translatedTexts }
  }
}
