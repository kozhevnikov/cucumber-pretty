import { indentStyleText } from './indentStyleText'
import { TextStyle } from './styleText'

export enum ThemeItem {
  DataTable = 'datatable',
  DataTableBorder = 'datatable border',
  DataTableContent = 'datatable content',
  DocStringContent = 'docstring content',
  DocStringDelimiter = 'docstring delimiter',
  FeatureDescription = 'feature description',
  FeatureKeyword = 'feature keyword',
  FeatureName = 'feature name',
  Location = 'location',
  RuleKeyword = 'rule keyword',
  RuleName = 'rule name',
  ScenarioKeyword = 'scenario keyword',
  ScenarioName = 'scenario name',
  StepKeyword = 'step keyword',
  StepMessage = 'step message',
  StepStatus = 'step status',
  StepText = 'step text',
  Tag = 'tag',
}
export type ThemeStyles = { [key in ThemeItem]: TextStyle[] }

const unstyledTheme: ThemeStyles = {
  [ThemeItem.DataTable]: [],
  [ThemeItem.DataTableBorder]: [],
  [ThemeItem.DataTableContent]: [],
  [ThemeItem.DocStringContent]: [],
  [ThemeItem.DocStringDelimiter]: [],
  [ThemeItem.FeatureDescription]: [],
  [ThemeItem.FeatureKeyword]: [],
  [ThemeItem.FeatureName]: [],
  [ThemeItem.Location]: [],
  [ThemeItem.RuleKeyword]: [],
  [ThemeItem.RuleName]: [],
  [ThemeItem.ScenarioKeyword]: [],
  [ThemeItem.ScenarioName]: [],
  [ThemeItem.StepKeyword]: [],
  [ThemeItem.StepMessage]: [],
  [ThemeItem.StepStatus]: [],
  [ThemeItem.StepText]: [],
  [ThemeItem.Tag]: [],
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
