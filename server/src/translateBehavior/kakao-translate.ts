import { HttpException, HttpService } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TranslateBehavior } from './translate-behavior.interface'

export class Kakao implements TranslateBehavior {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  public async translate(
    text: string,
    source: string,
    target: string,
  ): Promise<string> {
    const api_url = this.configService.get<string>('kakao.translateUrl')

    try {
      const response = await this.httpService
        .post(api_url, null, {
          headers: {
            Authorization:
              'KakaoAK ' + this.configService.get<string>('kakao.apiKey'),
          },
          params: {
            src_lang: source === 'ko' ? 'kr' : source,
            target_lang: target,
            query: text,
          },
        })
        .toPromise()

      const translated = this.joinTexts(response.data.translated_text)
      return translated
    } catch (error) {
      if (error.response.status === 429) {
        throw new HttpException('Kakao daily quota exceeded', 429)
      }
      throw new HttpException(error.message, error.response.status)
    }
  }

  private joinTexts(texts: string[][]): string {
    // https://web.archive.org/web/20170404182053/https://jsperf.com/concat-vs-plus-vs-join
    const textArrs: string[][] = texts.map((textsArr: string[]) => {
      if (textsArr.length === 0) return textsArr
      let textJoined = textsArr[0]
      for (let i = 1; i < textsArr.length; i++) {
        textJoined += ' ' + textsArr[i]
      }
      return [textJoined]
    })

    let textJoined = textArrs[0][0]
    for (let i = 1; i < textArrs.length; i++) {
      textJoined += textArrs[i].length === 0 ? '\n' : '\n' + textArrs[i][0]
    }

    return textJoined
  }
}
