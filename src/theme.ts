import { styleText, TextStyle } from './style'

export enum ThemeItem {
  FeatureKeyword = 'feature keyword',
  RuleKeyword = 'rule keyword',
  ScenarioKeyword = 'scenario keyword',
  StepKeyword = 'step keyword',
}
export type ThemeStyles = { [key in ThemeItem]: TextStyle[] }

export const makeTheme = (styles: ThemeStyles): ApplyThemeToItem => (
  item: ThemeItem,
  ...text: string[]
) => styleText(text.join(''), ...styles[item])

export type ApplyThemeToItem = (item: ThemeItem, ...text: string[]) => string
