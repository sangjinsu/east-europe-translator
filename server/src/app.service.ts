import { HttpService, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TranslationDto } from './dto/translation.dto'
import { Google } from './translateBehavior/google-translate'
import { Kakao } from './translateBehavior/kakao-translate'
import { Papago } from './translateBehavior/papago-translate'

import { KoEnTranslator } from './translator/ko-en-translator'

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async koEnTranslate(translationDto: TranslationDto) {
    const { text } = translationDto

    const papago = new KoEnTranslator(
      new Papago(this.httpService, this.configService),
    )

    const kakao = new KoEnTranslator(
      new Kakao(this.httpService, this.configService),
    )

    const google = new KoEnTranslator(new Google(this.configService))

    const translatedTexts = await Promise.allSettled([
      papago.performTranslate(text),
      kakao.performTranslate(text),
      google.performTranslate(text),
    ]).then((results) =>
      results.map((result) => {
        if (result.status === 'fulfilled') {
          return result.value
        }
      }),
    )
    return { translation: translatedTexts }
  }
}
