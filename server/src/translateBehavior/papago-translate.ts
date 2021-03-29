import { HttpException, HttpService, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TranslateBehavior } from './translate-behavior.interface'

export class Papago implements TranslateBehavior {
  private readonly logger = new Logger(Papago.name)

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
        this.logger.error(
          'Papago daily quota exceeded: error status ' + error.response.status,
        )
        throw new HttpException(
          'Papago daily quota exceeded',
          error.response.status,
        )
      }
      this.logger.error(
        error.message + ': error status ' + error.response.status,
      )
      throw new HttpException(error.message, error.response.status)
    }
  }
}
