import { indentStyleText } from './indentStyleText'
import { TextStyle } from './styleText'

export enum ThemeItem {
  FeatureKeyword = 'feature keyword',
  FeatureDescription = 'feature description',
  RuleKeyword = 'rule keyword',
  ScenarioKeyword = 'scenario keyword',
  StepKeyword = 'step keyword',
}
export type ThemeStyles = { [key in ThemeItem]: TextStyle[] }

const unstyledTheme: ThemeStyles = {
  [ThemeItem.FeatureKeyword]: [],
  [ThemeItem.FeatureDescription]: [],
  [ThemeItem.RuleKeyword]: [],
  [ThemeItem.ScenarioKeyword]: [],
  [ThemeItem.StepKeyword]: [],
}

export const makeTheme = (styles: Partial<ThemeStyles>): ThemeHelpers => {
  const validateItemExists = (item: string) => {
    if (!Object.values(ThemeItem).includes(item as ThemeItem))
      throw new Error(`Unknown theme item "${item}"`)
  }

  Object.keys(styles).forEach(validateItemExists)

  return {
    indentStyleText: (indent: number, item: ThemeItem, ...text: string[]) => {
      validateItemExists(item)
      return indentStyleText(
        indent,
        text.join(''),
        { ...unstyledTheme, ...styles }[item]
      )
    },
  }
}

export type IndentStyleThemeItem = (
  indent: number,
  item: ThemeItem,
  ...text: string[]
) => string
export type ThemeHelpers = {
  indentStyleText: IndentStyleThemeItem
}
