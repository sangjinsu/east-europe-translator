import { TranslateBehavior } from 'src/translateBehavior/translate-behavior.interface'

export class Translator {
  constructor(
    private translateBehavior: TranslateBehavior,
    private source: string,
    private target: string,
  ) {}

  performTranslate(text: string): Promise<string> {
    return this.translateBehavior.translate(text, this.source, this.target)
  }
}
