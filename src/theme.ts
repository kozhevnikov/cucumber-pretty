import { styleText, TextStyle } from './styleText'

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

export const makeTheme = (styles: Partial<ThemeStyles>): ApplyThemeToItem => {
  Object.keys(styles).forEach((item) => {
    if (!Object.values(ThemeItem).includes(item as ThemeItem))
      throw new Error(`Unknown theme item "${item}"`)
  })

  return (item: ThemeItem, ...text: string[]) =>
    styleText(text.join(''), ...{ ...unstyledTheme, ...styles }[item])
}

export type ApplyThemeToItem = (item: ThemeItem, ...text: string[]) => string
