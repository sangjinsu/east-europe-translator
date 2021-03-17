import { TranslationServiceClient } from '@google-cloud/translate'
import { HttpException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TranslateBehavior } from './translate-behavior.interface'

export class Google implements TranslateBehavior {
  constructor(private configService: ConfigService) {}

  public async translate(
    text: string,
    _source: string,
    target: string,
  ): Promise<string> {
    const fileName = this.configService.get<string>('google.keyFileName')
    const projectId = this.configService.get<string>('google.projectId')
    const locations = this.configService.get<string>('google.locations')

    const googleClient = new TranslationServiceClient({
      keyFilename: fileName,
    })

    const request = {
      parent: `projects/${projectId}/locations/${locations}`,
      contents: [text],
      mimeType: 'text/plain', // mime types: text/plain, text/html
      sourceLanguageCode: _source,
      targetLanguageCode: target,
    }

    try {
      const [response] = await googleClient.translateText(request)
      const translation = response.translations
      const translated = translation[0].translatedText
      return translated
    } catch (error) {
      if (error.response.status === 429) {
        throw new HttpException('Google daily quota exceeded', 429)
      }
      throw new HttpException(error.message, error.response.status)
    }
  }
}
