import { styleText, TextStyle } from './styleText'

export const indentStyleText = (
  indent: number,
  text: string,
  styles: TextStyle[] = []
): string =>
  text
    .replace(/^([ \t]*)(.*)$/gm, (_, __, subText) =>
      styleText(subText.trim(), ...styles)
    )
    .replace(/^(.+)$/gm, (subString) => `${' '.repeat(indent)}${subString}`)
