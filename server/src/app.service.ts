import { HttpService, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TranslationDto } from './dto/translation.dto'
import { EnRo, EnRu, KoEn, RuUk } from './srcTarget/source-target'
import { Google } from './translateBehavior/google-translate'
import { Kakao } from './translateBehavior/kakao-translate'
import { Papago } from './translateBehavior/papago-translate'
import { Translator } from './translator/translator'

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  // 번역 요청
  private async requestTranslate(text: string, translators: Translator[]) {
    const promises = []
    for (let i = 0; i < translators.length; i++) {
      promises.push(translators[i].performTranslate(text))
    }
    const responses = await Promise.allSettled(promises)

    const translatedText = responses.reduce((translations: string[], res) => {
      if (res.status === 'fulfilled') {
        translations.push(res.value)
      }
      return translations
    }, [])
    return translatedText
  }

  // 한국어 - 영어 번역
  async koEnTranslate(translationDto: TranslationDto) {
    const { text } = translationDto
    const koEn = new KoEn()

    const papago = new Translator(
      new Papago(this.httpService, this.configService),
      koEn,
    )

    const kakao = new Translator(
      new Kakao(this.httpService, this.configService),
      koEn,
    )

    const google = new Translator(new Google(this.configService), koEn)

    const translatedTexts = await this.requestTranslate(text, [
      papago,
      kakao,
      google,
    ])

    return { translation: translatedTexts }
  }

  // 영어 - 루마니아어 번역
  async enRoTranslate(translationDto: TranslationDto) {
    const { text } = translationDto
    const enRo = new EnRo()

    const google = new Translator(new Google(this.configService), enRo)

    const translatedText = await this.requestTranslate(text, [google])

    return { translation: translatedText }
  }

  // 영어 우크라이나어 번역
  async enUkTranslate(translationDto: TranslationDto) {
    const { text } = translationDto
    const enRu = new EnRu()
    const ruUk = new RuUk()

    const kakao = new Translator(
      new Kakao(this.httpService, this.configService),
      enRu,
    )
    const google = new Translator(new Google(this.configService), enRu)

    const russianTexts = await this.requestTranslate(text, [kakao, google])

    google.sourceTarget = ruUk

    const translatedText: string[] = []
    for (let i = 0; i < russianTexts.length; i++) {
      translatedText.push(
        ...(await this.requestTranslate(russianTexts[i], [google])),
      )
    }

    return { translation: translatedText }
  }
}
