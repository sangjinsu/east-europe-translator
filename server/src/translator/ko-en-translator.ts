import { TranslateBehavior } from 'src/translateBehavior/translate-behavior.interface'
import { Translator } from './translator'

export class KoEnTranslator extends Translator {
  constructor(translatorBehavior: TranslateBehavior) {
    super(translatorBehavior, 'ko', 'en')
  }
}
