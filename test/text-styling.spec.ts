import 'should'

import { indentStyleText } from '../src/indentStyleText'
import { styleText, TextStyle } from '../src/styleText'
import { ThemeItem, ThemeStyles } from '../src/theme'
import { run } from './exec'

describe('Text styling', () => {
  const runColored = (
    fileName: string,
    name?: string,
    theme?: Partial<ThemeStyles>,
    throws = false
  ) => run(fileName, { colorsEnabled: true, theme, '--name': name }, throws)

  it('fails with unknown styles', () => {
    const theme: Partial<ThemeStyles> = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      [ThemeItem.FeatureKeyword]: ['ultraviolet'],
    }
    try {
      runColored('step.feature', 'Step name', theme, true)
      throw new Error('Should have failed')
    } catch (error) {
      error.stderr
        .toString()
        .should.containEql('Error: Unknown style "ultraviolet"')
    }
  })

  it('fails with unknown theme items', () => {
    const theme: Partial<ThemeStyles> = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ['unknown theme item']: ['red'],
    }
    try {
      runColored('step.feature', 'Step name', theme, true)
      throw new Error('Should have failed')
    } catch (error) {
      error.stderr
        .toString()
        .should.containEql('Error: Unknown theme item "unknown theme item"')
    }
  })

  describe('customizable items', () => {
    it('styles feature keywords', () => {
      runColored('feature.feature', 'Feature name', {
        [ThemeItem.FeatureKeyword]: ['red', 'italic'],
      }).should.containEql(styleText('Feature:', 'red', 'italic'))
    })

    it('styles feature names', () => {
      runColored('feature.feature', 'Feature name', {
        [ThemeItem.FeatureName]: ['yellow', 'italic'],
      }).should.containEql(styleText('The Feature', 'yellow', 'italic'))
    })

    it('styles feature descriptions', () => {
      runColored('description.feature', undefined, {
        [ThemeItem.FeatureDescription]: ['bgGreen'],
      }).should.containEql(
        indentStyleText(2, '**I like**\nTo describe\nMy _features_', [
          'bgGreen',
        ])
      )
    })

    it('styles feature tags', () => {
      const s = (tag: string) => styleText(tag, 'bgYellow')
      runColored('tag.feature', 'Scenario tag', {
        [ThemeItem.Tag]: ['bgYellow'],
      }).should.containEql(`${s('@feature')} ${s('@tag')}\n`)
    })

    it('styles rule keywords', () => {
      runColored('rule.feature', undefined, {
        [ThemeItem.RuleKeyword]: ['yellow'],
      }).should.containEql(`  ${styleText('Rule:', 'yellow')} first rule\n`)
    })

    it('styles rule names', () => {
      runColored('rule.feature', undefined, {
        [ThemeItem.RuleName]: ['green'],
      }).should.containEql(`  Rule: ${styleText('first rule', 'green')}\n`)
    })

    it('styles scenario keywords', () => {
      runColored('scenario.feature', 'Scenario name', {
        [ThemeItem.ScenarioKeyword]: ['bgYellow'],
      }).should.containEql(
        `${styleText('Scenario:', 'bgYellow')} Scenario name\n`
      )
    })

    it('styles scenario names', () => {
      runColored('scenario.feature', 'Scenario name', {
        [ThemeItem.ScenarioName]: ['bgMagenta'],
      }).should.containEql(
        `  Scenario: ${styleText('Scenario name', 'bgMagenta')}\n`
      )
    })

    it('styles scenario tags', () => {
      const s = (tag: string) => styleText(tag, 'bgBlue')
      runColored('tag.feature', 'Scenario tag', {
        [ThemeItem.Tag]: ['bgBlue'],
      }).should.containEql(
        `  ${s('@feature')} ${s('@tag')} ${s('@scenario')}\n`
      )
    })

    it('styles step keywords', () => {
      const stepStyles: TextStyle[] = ['bgYellow', 'bold']
      runColored('step.feature', 'Step name', {
        [ThemeItem.StepKeyword]: stepStyles,
      }).should.containEql(
        `    ${styleText('Given', ...stepStyles)} noop\n` +
          `    ${styleText('When', ...stepStyles)} noop\n` +
          `    ${styleText('Then', ...stepStyles)} noop\n`
      )
    })

    it('styles step text', () => {
      const stepStyles: TextStyle[] = ['bgYellow', 'bold']
      runColored('step.feature', 'Step name', {
        [ThemeItem.StepText]: stepStyles,
      }).should.containEql(styleText('noop', ...stepStyles))
    })

    it('styles step statuses', () => {
      const stepStyles: TextStyle[] = ['bgWhite']
      const s = (text: string) => styleText(text, ...stepStyles)
      runColored('step.feature', 'Failed step', {
        [ThemeItem.StepStatus]: stepStyles,
      }).should.containEql(`    ${s('\u001b[31m✖ failed\u001b[39m')}\n      `)
    })

    it('styles step messages', () => {
      const stepStyles: TextStyle[] = ['bgCyan']
      const s = (text: string) => styleText(text, ...stepStyles)
      runColored('step.feature', 'Failed step', {
        [ThemeItem.StepMessage]: stepStyles,
      }).should.containEql(`      ${s('Error: FAILED')}\n      `)
    })

    it('styles DocString content and delimiters', () => {
      runColored('doc-string.feature', undefined, {
        [ThemeItem.DocStringDelimiter]: ['green', 'bgYellow'],
        [ThemeItem.DocStringContent]: ['red', 'bold'],
      }).should.containEql(
        `${indentStyleText(6, '"""', ['green', 'bgYellow'])}\n` +
          `${indentStyleText(6, 'foo\nbar', ['red', 'bold'])}\n` +
          `${indentStyleText(6, '"""', ['green', 'bgYellow'])}\n`
      )
    })

    it('styles DataTables', () => {
      const styles: TextStyle[] = ['green', 'bgYellow']
      runColored('data-table.feature', undefined, {
        [ThemeItem.DataTable]: ['green', 'bgYellow'],
      }).should.containEql(
        `      ${styleText('│ foo   │ bar   │', ...styles)}\n` +
          `      ${styleText('│ lorem │ ipsum │', ...styles)}\n`
      )
    })

    it('styles DataTable borders', () => {
      const border = styleText('│', 'green', 'bgYellow')
      runColored('data-table.feature', undefined, {
        [ThemeItem.DataTableBorder]: ['green', 'bgYellow'],
      }).should.containEql(
        `      ${border} foo   ${border} bar   ${border}\n` +
          `      ${border} lorem ${border} ipsum ${border}\n`
      )
    })

    it('styles DataTable content', () => {
      const styles: TextStyle[] = ['green', 'bgYellow']
      runColored('data-table.feature', undefined, {
        [ThemeItem.DataTableContent]: ['green', 'bgYellow'],
      }).should.containEql(
        `      │ ${styleText('foo', ...styles)}   │ ${styleText(
          'bar',
          ...styles
        )}   │\n` +
          `      │ ${styleText('lorem', ...styles)} │ ${styleText(
            'ipsum',
            ...styles
          )} │\n`
      )
    })
  })

  describe('non-customizable items (colored by Cucumber)', () => {
    it('styles ambiguous steps', () => {
      runColored('step.feature', 'Ambiguous step').should.containEql(
        `    ${styleText('✖ ambiguous', 'red')}\n`
      )
    })

    it('styles failed steps', () => {
      runColored('step.feature', 'Failed step').should.containEql(
        `    ${styleText('✖ failed', 'red')}\n`
      )
    })

    it('styles pending steps', () => {
      runColored('step.feature', 'Pending step').should.containEql(
        `    ${styleText('? pending', 'yellow')}\n`
      )
    })

    it('styles undefined steps', () => {
      runColored('step.feature', 'Undefined step').should.containEql(
        `    ${styleText('? undefined', 'yellow')}\n`
      )
    })

    it('styles skipped steps', () => {
      runColored('step.feature', 'Skipped step').should.containEql(
        `    ${styleText('- skipped', 'cyan')}\n`
      )
    })

    it('styles errors', () => {
      runColored('step.feature', 'Failed step').should.containEql(
        `    ${styleText('Error: FAILED', 'red')}`
      )
    })
  })

  describe('default theme', () => {
    let runResult: string
    before(() => (runResult = runColored('step.feature')))

    it('styles feature keywords', () =>
      runResult.should.containEql(styleText('Feature:', 'blueBright', 'bold')))

    it('styles feature names', () =>
      runResult.should.containEql(styleText('Step', 'blueBright', 'underline')))

    it('styles feature tags', () =>
      runResult.should.containEql(styleText('@tag', 'cyan')))

    it('styles rule keywords', () =>
      runResult.should.containEql(styleText('Rule:', 'blueBright', 'bold')))

    it('styles rule names', () =>
      runResult.should.containEql(
        styleText('some rule', 'blueBright', 'underline')
      ))

    it('styles scenario keywords', () =>
      runResult.should.containEql(styleText('Scenario:', 'cyan', 'bold')))

    it('styles scenario names', () =>
      runResult.should.containEql(styleText('Step name', 'cyan', 'underline')))

    it('styles scenario tags', () =>
      runResult.should.containEql(styleText('@stag', 'cyan')))

    it('styles descriptions', () =>
      runResult.should.containEql(styleText('Description', 'gray')))

    it('styles step keywords', () => {
      runResult.should.containEql(styleText('Given', 'cyan'))
      runResult.should.containEql(styleText('When', 'cyan'))
      runResult.should.containEql(styleText('Then', 'cyan'))
    })

    it('does not style step text', () => {
      runResult.should.containEql(styleText('noop'))
    })

    it('styles DocString content and delimiters', () => {
      runResult.should.containEql(
        `${indentStyleText(6, '"""', ['gray'])}\n` +
          `${indentStyleText(6, 'Some multiline\nText', [
            'gray',
            'italic',
          ])}\n` +
          `${indentStyleText(6, '"""', ['gray'])}\n`
      )
    })

    it('styles DataTable borders and content', () => {
      const d = styleText('│', 'gray')
      const s = (text: string) => styleText(text, 'gray', 'italic')

      runResult.should.containEql(
        `      ${d} ${s('a')} ${d} ${s('b')} ${d}\n` +
          `      ${d} ${s('c')} ${d} ${s('d')} ${d}\n`
      )
    })
  })
})
