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
      [ThemeItem.FeatureKeyword]: ['red'],
      [ThemeItem.FeatureDescription]: ['white'],
      [ThemeItem.RuleKeyword]: ['green'],
      [ThemeItem.ScenarioKeyword]: ['blue'],
      [ThemeItem.StepKeyword]: ['magenta'],
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

  it('applies styles to Rule keywords', () => {
    styleThemeItem(0, ThemeItem.RuleKeyword, 'Règle:').should.containEql(
      styleText('Règle:', 'green')
    )
  })

  it('applies styles to Scenario keywords', () => {
    styleThemeItem(0, ThemeItem.ScenarioKeyword, 'Scénario:').should.containEql(
      styleText('Scénario:', 'blue')
    )
  })

  it('applies styles to Step keywords', () => {
    styleThemeItem(0, ThemeItem.StepKeyword, 'Etant donné').should.containEql(
      styleText('Etant donné', 'magenta')
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
