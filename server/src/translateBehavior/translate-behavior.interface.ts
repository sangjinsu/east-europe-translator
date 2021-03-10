export interface TranslateBehavior {
  translate(text: string, source: string, target: string): Promise<string>
}
