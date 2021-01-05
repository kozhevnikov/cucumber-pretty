import 'should'
import { styleText } from './styleText'

import {
  IndentStyleThemeItem,
  makeTheme,
  ThemeItem,
  ThemeStyles,
} from './theme'

describe('Theme', () => {
  let styleThemeItem: IndentStyleThemeItem

  beforeEach(() => {
    const styles: ThemeStyles = {
      [ThemeItem.DataTable]: ['bgRed'],
      [ThemeItem.DataTableBorder]: ['red'],
      [ThemeItem.DataTableContent]: ['blue'],
      [ThemeItem.DocStringContent]: ['green'],
      [ThemeItem.DocStringDelimiter]: ['red'],
      [ThemeItem.FeatureDescription]: ['white'],
      [ThemeItem.FeatureKeyword]: ['red'],
      [ThemeItem.FeatureName]: ['yellow'],
      [ThemeItem.Location]: ['bgWhite', 'black'],
      [ThemeItem.RuleKeyword]: ['green'],
      [ThemeItem.RuleName]: ['bgRed'],
      [ThemeItem.ScenarioKeyword]: ['blue'],
      [ThemeItem.ScenarioName]: ['blue', 'underline'],
      [ThemeItem.StepKeyword]: ['magenta'],
      [ThemeItem.StepMessage]: ['bgCyan'],
      [ThemeItem.StepStatus]: ['bgRed'],
      [ThemeItem.StepText]: ['bgYellow'],
      [ThemeItem.Tag]: ['bgRed'],
    }
    styleThemeItem = makeTheme(styles).indentStyleText
  })

  it('applies styles to Feature keywords', () => {
    styleThemeItem(
      0,
      ThemeItem.FeatureKeyword,
      'Fonctionnalité:'
    ).should.containEql(styleText('Fonctionnalité:', 'red'))
  })

  it('applies styles to Feature names', () => {
    styleThemeItem(0, ThemeItem.FeatureName, 'my feature').should.containEql(
      styleText('my feature', 'yellow')
    )
  })

  it('applies styles to feature descriptions', () => {
    styleThemeItem(
      2,
      ThemeItem.FeatureDescription,
      'This is some\ndescription...'
    ).should.containEql(
      `  ${styleText('This is some', 'white')}\n` +
        `  ${styleText('description...', 'white')}`
    )
  })

  it('applies styles to locations', () => {
    styleThemeItem(
      0,
      ThemeItem.Location,
      '# path/to/file.feature:12'
    ).should.containEql(
      styleText('# path/to/file.feature:12', 'bgWhite', 'black')
    )
  })

  it('applies styles to Rule keywords', () => {
    styleThemeItem(0, ThemeItem.RuleKeyword, 'Règle:').should.containEql(
      styleText('Règle:', 'green')
    )
  })

  it('applies styles to Rule names', () => {
    styleThemeItem(0, ThemeItem.RuleName, 'my rules').should.containEql(
      styleText('my rules', 'bgRed')
    )
  })

  it('applies styles to Scenario keywords', () => {
    styleThemeItem(0, ThemeItem.ScenarioKeyword, 'Scénario:').should.containEql(
      styleText('Scénario:', 'blue')
    )
  })

  it('applies styles to Scenario names', () => {
    styleThemeItem(0, ThemeItem.ScenarioName, 'my scenario').should.containEql(
      styleText('my scenario', 'blue', 'underline')
    )
  })

  it('applies styles to Step keywords', () => {
    styleThemeItem(0, ThemeItem.StepKeyword, 'Etant donné').should.containEql(
      styleText('Etant donné', 'magenta')
    )
  })

  it('applies styles to Step text', () => {
    styleThemeItem(0, ThemeItem.StepText, 'some cucumbers').should.containEql(
      styleText('some cucumbers', 'bgYellow')
    )
  })

  it('applies styles to Step statuses', () => {
    styleThemeItem(
      0,
      ThemeItem.StepStatus,
      '? undefined step'
    ).should.containEql(styleText('? undefined step', 'bgRed'))
  })

  it('applies styles to Step messages', () => {
    styleThemeItem(0, ThemeItem.StepMessage, 'step message').should.containEql(
      styleText('step message', 'bgCyan')
    )
  })

  it('applies styles to DocString content', () => {
    styleThemeItem(
      0,
      ThemeItem.DocStringContent,
      'this is some docstring'
    ).should.containEql(styleText('this is some docstring', 'green'))
  })

  it('applies styles to DocString delimiters', () => {
    styleThemeItem(0, ThemeItem.DocStringDelimiter, '"""').should.containEql(
      styleText('"""', 'red')
    )
  })

  it('applies styles to DataTable', () => {
    styleThemeItem(
      0,
      ThemeItem.DataTable,
      '| foo | bar |\n| baz | oof |'
    ).should.containEql(
      `${styleText('| foo | bar |', 'bgRed')}\n${styleText(
        '| baz | oof |',
        'bgRed'
      )}`
    )
  })

  it('applies styles to DataTable borders', () => {
    styleThemeItem(0, ThemeItem.DataTableBorder, '|').should.containEql(
      styleText('|', 'red')
    )
  })

  it('applies styles to DataTable content', () => {
    styleThemeItem(0, ThemeItem.DataTableContent, 'foo').should.containEql(
      styleText('foo', 'blue')
    )
  })

  it('applies styles to feature tags', () => {
    styleThemeItem(0, ThemeItem.Tag, '@someTag').should.containEql(
      styleText('@someTag', 'bgRed')
    )
  })

  it('concatenates multiple strings', () => {
    styleThemeItem(
      0,
      ThemeItem.StepKeyword,
      'Etant',
      ' donné',
      ' que'
    ).should.containEql(styleText('Etant donné que', 'magenta'))
  })

  it('fails when applying styles to unknown theme items', () => {
    ;(() =>
      styleThemeItem(
        0,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        'unknown theme item',
        'text'
      )).should.throw()
  })

  it('fails when making a theme with unknown theme items', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ;(() => makeTheme({ 'random item': ['red'] })).should.throwError(
      'Unknown theme item "random item"'
    )
  })

  it('defaults to unstyled items', () => {
    styleThemeItem = makeTheme({}).indentStyleText
    styleThemeItem(0, ThemeItem.FeatureKeyword, 'Feature').should.eql('Feature')
    styleThemeItem(0, ThemeItem.RuleKeyword, 'Rule').should.eql('Rule')
    styleThemeItem(0, ThemeItem.ScenarioKeyword, 'Scenario').should.eql(
      'Scenario'
    )
    styleThemeItem(0, ThemeItem.StepKeyword, 'Given').should.eql('Given')
  })

  it('allows some defined and some missing styles', () => {
    styleThemeItem = makeTheme({ [ThemeItem.FeatureKeyword]: ['red'] })
      .indentStyleText
    styleThemeItem(0, ThemeItem.FeatureKeyword, 'Feature').should.containEql(
      styleText('Feature', 'red')
    )
    styleThemeItem(0, ThemeItem.RuleKeyword, 'Rule').should.eql('Rule')
    styleThemeItem(0, ThemeItem.ScenarioKeyword, 'Scenario').should.eql(
      'Scenario'
    )
    styleThemeItem(0, ThemeItem.StepKeyword, 'Given').should.eql('Given')
  })
})
