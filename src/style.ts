import {
  BackgroundColor,
  bgColor,
  color,
  CSPair,
  ForegroundColor,
  modifier,
  Modifier,
} from 'ansi-styles'

export type TextStyle =
  | keyof BackgroundColor
  | keyof ForegroundColor
  | keyof Modifier

type StyleFunction = (text: string) => string
const styleDefs: { [key in TextStyle]: CSPair } = {
  ...bgColor,
  ...color,
  ...modifier,
}

export const styleText = (text: string, ...styles: TextStyle[]): string => {
  validateStyles(styles)
  return applyStyles(...styles)(text)
}

const validateStyles = (styles: TextStyle[]) => {
  styles.forEach((style) => {
    if (!(style in styleDefs)) throw new Error(`Unknown style "${style}"`)
  })
}

const applyStyles = (...styles: TextStyle[]): StyleFunction =>
  styles.reduce<StyleFunction>(
    (fn, style) => (text) =>
      fn(`${styleDefs[style].open}${text}${styleDefs[style].close}`),
    (text) => text
  )
