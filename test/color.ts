import 'should'

import { run } from './exec'

describe('Color', () => {
  const runColored = (fileName: string, name: string) =>
    run(fileName, { colorsEnabled: true, '--name': name })

  it('should color feature keyword', () => {
    runColored('feature.feature', 'Feature name').should.containEql(
      '\u001b[35m\u001b[1m' + 'Feature' + '\u001b[22m\u001b[39m' + ': Feature\n'
    )
  })

  it('should color scenario keyword', () => {
    runColored('scenario.feature', 'Scenario name').should.containEql(
      '\u001b[35m\u001b[1m' +
        'Scenario' +
        '\u001b[22m\u001b[39m' +
        ': Scenario name\n'
    )
  })

  it('should color step keywords', () => {
    runColored('step.feature', 'Step name').should.containEql(
      '    \u001b[1mWhen\u001b[22m noop\n' +
        '    \u001b[1mThen\u001b[22m noop\n'
    )
  })

  it('should color ambiguous step', () => {
    runColored('step.feature', 'Ambiguous step').should.containEql(
      '    \u001b[31m✖ ambiguous\u001b[39m\n'
    )
  })

  it('should color failed step', () => {
    runColored('step.feature', 'Failed step').should.containEql(
      '    \u001b[31m✖ failed\u001b[39m\n'
    )
  })

  it('should color pending step', () => {
    runColored('step.feature', 'Pending step').should.containEql(
      '    \u001b[33m? pending\u001b[39m\n'
    )
  })

  it('should color skipped step', () => {
    runColored('step.feature', 'Skipped step').should.containEql(
      '    \u001b[36m- skipped\u001b[39m\n'
    )
  })

  it('should color undefined step', () => {
    runColored('step.feature', 'Undefined step').should.containEql(
      '    \u001b[33m? undefined\u001b[39m\n'
    )
  })

  it('should color error', () => {
    runColored('step.feature', 'Failed step').should.containEql(
      '    \u001b[31mError: FAILED'
    )
  })

  it('should color feature tag', () => {
    runColored('tag.feature', 'Feature tag').should.containEql(
      '\u001b[36m@feature @tag\u001b[39m\n'
    )
  })

  it('should color scenario tag', () => {
    runColored('tag.feature', 'Scenario tag').should.containEql(
      '\u001b[36m@feature @tag @scenario\u001b[39m\n'
    )
  })
})
