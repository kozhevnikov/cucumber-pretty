import 'should'

import { ApplyThemeToItem, makeTheme, ThemeItem, ThemeStyles } from './theme'

describe('theme', () => {
  let applyTheme: ApplyThemeToItem

  beforeEach(() => {
    const styles: ThemeStyles = {
      [ThemeItem.FeatureKeyword]: ['red'],
      [ThemeItem.RuleKeyword]: ['green'],
      [ThemeItem.ScenarioKeyword]: ['blue'],
      [ThemeItem.StepKeyword]: ['magenta'],
    }
    applyTheme = makeTheme(styles)
  })

  it('applies styles to Feature keywords', () => {
    applyTheme(ThemeItem.FeatureKeyword, 'Fonctionnalité:').should.containEql(
      '\u001b[31mFonctionnalité:\u001b[39m'
    )
  })

  it('applies styles to Rule keywords', () => {
    applyTheme(ThemeItem.RuleKeyword, 'Règle:').should.containEql(
      '\u001b[32mRègle:\u001b[39m'
    )
  })

  it('applies styles to Scenario keywords', () => {
    applyTheme(ThemeItem.ScenarioKeyword, 'Scénario:').should.containEql(
      '\u001b[34mScénario:\u001b[39m'
    )
  })

  it('applies styles to Step keywords', () => {
    applyTheme(ThemeItem.StepKeyword, 'Etant donné').should.containEql(
      '\u001b[35mEtant donné\u001b[39m'
    )
  })

  it('concatenates multiple strings', () => {
    applyTheme(
      ThemeItem.StepKeyword,
      'Etant',
      ' donné',
      ' que'
    ).should.containEql('\u001b[35mEtant donné que\u001b[39m')
  })

  it('fails on unknown theme items', () => {
    ;(() =>
      applyTheme(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        'unknown theme item',
        'text'
      )).should.throw()
  })

  it('defaults to unstyled items', () => {
    applyTheme = makeTheme({})
    applyTheme(ThemeItem.FeatureKeyword, 'Feature').should.eql('Feature')
    applyTheme(ThemeItem.RuleKeyword, 'Rule').should.eql('Rule')
    applyTheme(ThemeItem.ScenarioKeyword, 'Scenario').should.eql('Scenario')
    applyTheme(ThemeItem.StepKeyword, 'Given').should.eql('Given')
  })

  it('allows some defined and some missing styles', () => {
    applyTheme = makeTheme({ [ThemeItem.FeatureKeyword]: ['red'] })
    applyTheme(ThemeItem.FeatureKeyword, 'Feature').should.containEql(
      '\u001b[31mFeature\u001b[39m'
    )
    applyTheme(ThemeItem.RuleKeyword, 'Rule').should.eql('Rule')
    applyTheme(ThemeItem.ScenarioKeyword, 'Scenario').should.eql('Scenario')
    applyTheme(ThemeItem.StepKeyword, 'Given').should.eql('Given')
  })
})
