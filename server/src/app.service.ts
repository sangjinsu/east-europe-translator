import { HttpService, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TranslationDto } from './dto/translation.dto'
import { Google } from './translateBehavior/google-translate'
import { Kakao } from './translateBehavior/kakao-translate'
import { Papago } from './translateBehavior/papago-translate'
import {
  EnRoTranslator,
  EnRuTranslator,
  KoEnTranslator,
  RuUkTranslator,
  Translator,
} from './translator/translator'

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
    const translatedText: string[] = await Promise.allSettled(promises).then(
      (results) =>
        results.map((result) => {
          if (result.status === 'fulfilled') {
            return result.value
          }
        }),
    )
    return translatedText
  }

  // 한국어 - 영어 번역
  async koEnTranslate(translationDto: TranslationDto) {
    const { text } = translationDto

    const papago = new KoEnTranslator(
      new Papago(this.httpService, this.configService),
    )

    const kakao = new KoEnTranslator(
      new Kakao(this.httpService, this.configService),
    )

    const google = new KoEnTranslator(new Google(this.configService))

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

    const google = new EnRoTranslator(new Google(this.configService))

    const translatedText = await this.requestTranslate(text, [google])

    return { translation: translatedText }
  }

  // 영어 우크라이나어 번역
  async enUkTranslate(translationDto: TranslationDto) {
    const { text } = translationDto

    const enRuKakao = new EnRuTranslator(
      new Kakao(this.httpService, this.configService),
    )
    const enRuGoogle = new EnRuTranslator(new Google(this.configService))

    const russianTexts = await this.requestTranslate(text, [
      enRuKakao,
      enRuGoogle,
    ])

    const ruUkGoogle = new RuUkTranslator(new Google(this.configService))

    const translatedText: string[] = []
    for (let i = 0; i < russianTexts.length; i++) {
      translatedText.push(
        ...(await this.requestTranslate(russianTexts[i], [ruUkGoogle])),
      )
    }

    return { translation: translatedText }
  }
}
