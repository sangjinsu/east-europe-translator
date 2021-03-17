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

export class KoEnTranslator extends Translator {
  constructor(translatorBehavior: TranslateBehavior) {
    super(translatorBehavior, 'ko', 'en')
  }
}

export class EnRuTranslator extends Translator {
  constructor(translatorBehavior: TranslateBehavior) {
    super(translatorBehavior, 'en', 'ru')
  }
}

export class EnRoTranslator extends Translator {
  constructor(translatorBehavior: TranslateBehavior) {
    super(translatorBehavior, 'en', 'ro')
  }
}

export class RuUkTranslator extends Translator {
  constructor(translatorBehavior: TranslateBehavior) {
    super(translatorBehavior, 'ru', 'uk')
  }
}
