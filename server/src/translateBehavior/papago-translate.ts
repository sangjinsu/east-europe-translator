import { HttpException, HttpService } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TranslateBehavior } from './translate-behavior.interface'

export class Papago implements TranslateBehavior {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  public async translate(
    text: string,
    source: string,
    target: string,
  ): Promise<string> {
    const API_URL = this.configService.get<string>('papago.translateUrl')

    try {
      const response = await this.httpService
        .post(
          API_URL,
          {
            source: source,
            target: target,
            text: text,
          },
          {
            headers: {
              'X-Naver-Client-Id': this.configService.get<string>(
                'papago.ClientId',
              ),
              'X-Naver-Client-Secret': this.configService.get<string>(
                'papago.ClientSecret',
              ),
            },
          },
        )
        .toPromise()

      const translated = response.data.message.result.translatedText as string
      return translated
    } catch (error) {
      if (error.response.status === 429) {
        throw new HttpException('Papago daily quota exceeded', 429)
      }
      throw new HttpException(error.message, error.response.status)
    }
  }
}
