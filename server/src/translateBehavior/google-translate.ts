import { Translate } from '@google-cloud/translate/build/src/v2'
import { HttpException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TranslateBehavior } from './translate-behavior.interface'

export class Google implements TranslateBehavior {
  constructor(private configService: ConfigService) {}

  async translate(
    text: string,
    _source: string,
    target: string,
  ): Promise<string> {
    const googleClient = new Translate({
      keyFilename: this.configService.get<string>('google.keyFileName'),
    })

    try {
      const [translations] = await googleClient.translate(text, target)
      return translations
    } catch (error) {
      if (error.response.status === 429) {
        throw new HttpException('Google daily quota exceeded', 429)
      }
      throw new HttpException(error.message, error.response.status)
    }
  }
}
