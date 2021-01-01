import 'should'

import { run } from './exec'

describe('Step', () => {
  it('logs steps', () => {
    run('step.feature', { '--name': 'Step name' }).should.containEql(
      '    Given noop\n' +
        '    When noop\n' +
        '    Then noop\n' +
        '    And noop\n' +
        '    But noop\n'
    )
  })

  it('warns about ambiguous steps', () => {
    run('step.feature', { '--name': 'Ambiguous step' }).should.containEql(
      '    When ambiguous\n' + '    ✖ ambiguous\n'
    )
  })

  it('warns about failed steps', () => {
    run('step.feature', { '--name': 'Failed step' }).should.containEql(
      '    When failed\n' + '    ✖ failed\n'
    )
  })

  it('logs passed steps', () => {
    run('step.feature', { '--name': 'Passed step' }).should.match(
      / {4}When passed\n(?! {4})/
    )
  })

  it('logs pending steps', () => {
    run('step.feature', { '--name': 'Pending step' }).should.containEql(
      '    When pending\n' + '    ? pending\n'
    )
  })

  it('logs skipped steps', () => {
    run('step.feature', { '--name': 'Skipped step' }).should.containEql(
      '    When skipped\n' + '    - skipped\n'
    )
  })

  it('logs undefined steps', () => {
    run('step.feature', { '--name': 'Undefined step' }).should.containEql(
      '    When undefined\n' + '    ? undefined\n'
    )
  })

  it('logs errors', () => {
    run('step.feature', { '--name': 'Failed step' }).should.containEql(
      '    When failed\n' +
        '    ✖ failed\n' +
        '      Error: FAILED\n' +
        '          at World'
    )
  })
})
