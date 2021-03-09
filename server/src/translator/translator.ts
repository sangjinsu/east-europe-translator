import { TranslateBehavior } from 'src/translateBehavior/translate-behavior.interface'

export class Translator {
  translateBehavior: TranslateBehavior
  source: string
  target: string

  performTranslate(text: string): Promise<string> {
    return this.translateBehavior.translate(text, this.source, this.target)
  }
}
