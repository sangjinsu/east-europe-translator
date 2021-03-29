import { SourceTarget } from 'src/srcTarget/source-target'
import { TranslateBehavior } from 'src/translateBehavior/translate-behavior.interface'

export class Translator {
  constructor(
    private readonly translateBehavior: TranslateBehavior,
    private _sourceTarget: SourceTarget,
  ) {}

  public performTranslate(text: string): Promise<string> {
    return this.translateBehavior.translate(
      text,
      this._sourceTarget.source,
      this._sourceTarget.target,
    )
  }

  public set sourceTarget(sourceTarget: SourceTarget) {
    this._sourceTarget = sourceTarget
  }
}
