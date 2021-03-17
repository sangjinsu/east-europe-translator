export abstract class SourceTarget {
  constructor(
    private readonly _source: string,
    private readonly _target: string,
  ) {}

  public get source() {
    return this._source
  }

  public get target() {
    return this._target
  }
}

export class KoEn extends SourceTarget {
  constructor() {
    super('ko', 'en')
  }
}

export class EnRo extends SourceTarget {
  constructor() {
    super('en', 'ro')
  }
}

export class EnRu extends SourceTarget {
  constructor() {
    super('en', 'ru')
  }
}

export class RuUk extends SourceTarget {
  constructor() {
    super('ru', 'uk')
  }
}
