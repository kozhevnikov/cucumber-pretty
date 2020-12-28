import {
  BackgroundColor,
  bgColor,
  color,
  CSPair,
  ForegroundColor,
  modifier,
  Modifier,
} from 'ansi-styles'

export type TextStyle = 'bold' | 'magenta'
type X = keyof BackgroundColor | keyof ForegroundColor | keyof Modifier

type StyleFunction = (text: string) => string
const styleDefs: { [key in X]: CSPair } = {
  ...bgColor,
  ...color,
  ...modifier,
}

export const styleText = (text: string, ...styles: TextStyle[]): string =>
  applyStyles(...styles)(text)

const applyStyles = (...styles: TextStyle[]): StyleFunction =>
  styles.reduce<StyleFunction>(
    (fn, style) => (text) =>
      fn(`${styleDefs[style].open}${text}${styleDefs[style].close}`),
    (text) => text
  )
