import 'should'

import { run } from './exec'
import { styleText, TextStyle } from '../src/styleText'

describe('Color', () => {
  const runColored = (fileName: string, name?: string) =>
    run(fileName, { colorsEnabled: true, '--name': name })

  it('colors feature keywords', () => {
    runColored('feature.feature', 'Feature name').should.containEql(
      styleText('Feature:', 'blue', 'bold')
    )
  })

  it('colors rule keywords', () => {
    runColored('rule.feature').should.containEql(
      `  ${styleText('Rule:', 'blue', 'bold')} first rule\n`
    )
  })

  it('colors scenario keywords', () => {
    runColored('scenario.feature', 'Scenario name').should.containEql(
      `${styleText('Scenario:', 'cyan')} Scenario name\n`
    )
  })

  it('colors step keywords', () => {
    const stepStyles: TextStyle[] = ['cyan', 'bold']
    runColored('step.feature', 'Step name').should.containEql(
      `    ${styleText('Given', ...stepStyles)} noop\n` +
        `    ${styleText('When', ...stepStyles)} noop\n` +
        `    ${styleText('Then', ...stepStyles)} noop\n`
    )
  })

  it('colors ambiguous steps', () => {
    runColored('step.feature', 'Ambiguous step').should.containEql(
      `    ${styleText('✖ ambiguous', 'red')}\n`
    )
  })

  it('colors failed steps', () => {
    runColored('step.feature', 'Failed step').should.containEql(
      `    ${styleText('✖ failed', 'red')}\n`
    )
  })

  it('colors pending steps', () => {
    runColored('step.feature', 'Pending step').should.containEql(
      `    ${styleText('? pending', 'yellow')}\n`
    )
  })

  it('colors undefined steps', () => {
    runColored('step.feature', 'Undefined step').should.containEql(
      `    ${styleText('? undefined', 'yellow')}\n`
    )
  })

  it('colors skipped steps', () => {
    runColored('step.feature', 'Skipped step').should.containEql(
      `    ${styleText('- skipped', 'cyan')}\n`
    )
  })

  it('colors errors', () => {
    runColored('step.feature', 'Failed step').should.containEql(
      `    ${styleText('Error: FAILED', 'red')}`
    )
  })

  it('colors feature tags', () => {
    runColored('tag.feature', 'Feature tag').should.containEql(
      `${styleText('@feature @tag', 'cyan')}\n`
    )
  })

  it('colors scenario tags', () => {
    runColored('tag.feature', 'Scenario tag').should.containEql(
      `${styleText('@feature @tag @scenario', 'cyan')}\n`
    )
  })
})
