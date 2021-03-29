import { TranslationServiceClient } from '@google-cloud/translate'
import { HttpException, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TranslateBehavior } from './translate-behavior.interface'

export class Google implements TranslateBehavior {
  private readonly logger = new Logger(Google.name)
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
        this.logger.error(
          'Google daily quota exceeded: error status ' + error.response.status,
        )
        throw new HttpException(
          'Google daily quota exceeded',
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
