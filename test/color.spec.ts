import 'should'

import { run } from './exec'

describe('Color', () => {
  const runColored = (fileName: string, name?: string) =>
    run(fileName, { colorsEnabled: true, '--name': name })

  it('should color feature keywords', () => {
    runColored('feature.feature', 'Feature name').should.containEql(
      '\u001b[34m\u001b[1mFeature:\u001b[22m\u001b[39m Feature\n'
    )
  })

  it('should color rule keywords', () => {
    runColored('rule.feature').should.containEql(
      '  \u001b[34m\u001b[1mRule:\u001b[22m\u001b[39m first rule\n'
    )
  })

  it('should color scenario keywords', () => {
    runColored('scenario.feature', 'Scenario name').should.containEql(
      '\u001b[36mScenario:\u001b[39m Scenario name\n'
    )
  })

  it('should color step keywords', () => {
    runColored('step.feature', 'Step name').should.containEql(
      '    \u001b[36m\u001b[1mGiven\u001b[22m\u001b[39m noop\n' +
        '    \u001b[36m\u001b[1mWhen\u001b[22m\u001b[39m noop\n' +
        '    \u001b[36m\u001b[1mThen\u001b[22m\u001b[39m noop\n'
    )
  })

  it('should color ambiguous steps', () => {
    runColored('step.feature', 'Ambiguous step').should.containEql(
      '    \u001b[31m✖ ambiguous\u001b[39m\n'
    )
  })

  it('should color failed steps', () => {
    runColored('step.feature', 'Failed step').should.containEql(
      '    \u001b[31m✖ failed\u001b[39m\n'
    )
  })

  it('should color pending steps', () => {
    runColored('step.feature', 'Pending step').should.containEql(
      '    \u001b[33m? pending\u001b[39m\n'
    )
  })

  it('should color skipped steps', () => {
    runColored('step.feature', 'Skipped step').should.containEql(
      '    \u001b[36m- skipped\u001b[39m\n'
    )
  })

  it('should color undefined steps', () => {
    runColored('step.feature', 'Undefined step').should.containEql(
      '    \u001b[33m? undefined\u001b[39m\n'
    )
  })

  it('should color errors', () => {
    runColored('step.feature', 'Failed step').should.containEql(
      '    \u001b[31mError: FAILED'
    )
  })

  it('should color feature tags', () => {
    runColored('tag.feature', 'Feature tag').should.containEql(
      '\u001b[36m@feature @tag\u001b[39m\n'
    )
  })

  it('should color scenario tags', () => {
    runColored('tag.feature', 'Scenario tag').should.containEql(
      '\u001b[36m@feature @tag @scenario\u001b[39m\n'
    )
  })
})
