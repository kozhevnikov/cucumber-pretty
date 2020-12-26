import 'should'

import { run } from './exec'

describe('Step', () => {
  it('should log step', () => {
    run('step.feature', { '--name': 'Step name' }).should.containEql(
      '    Given noop\n' +
        '    When noop\n' +
        '    Then noop\n' +
        '    And noop\n' +
        '    But noop\n'
    )
  })

  it('should log ambiguous step', () => {
    run('step.feature', { '--name': 'Ambiguous step' }).should.containEql(
      '    When ambiguous\n' + '    ✖ ambiguous\n'
    )
  })

  it('should log failed step', () => {
    run('step.feature', { '--name': 'Failed step' }).should.containEql(
      '    When failed\n' + '    ✖ failed\n'
    )
  })

  it('should log passed step', () => {
    run('step.feature', { '--name': 'Passed step' }).should.match(
      / {4}When passed\n(?! {4})/
    )
  })

  it('should log pending step', () => {
    run('step.feature', { '--name': 'Pending step' }).should.containEql(
      '    When pending\n' + '    ? pending\n'
    )
  })

  it('should log skipped step', () => {
    run('step.feature', { '--name': 'Skipped step' }).should.containEql(
      '    When skipped\n' + '    - skipped\n'
    )
  })

  it('should log undefined step', () => {
    run('step.feature', { '--name': 'Undefined step' }).should.containEql(
      '    When undefined\n' + '    ? undefined\n'
    )
  })

  it('should log error', () => {
    run('step.feature', { '--name': 'Failed step' }).should.containEql(
      '    When failed\n' +
        '    ✖ failed\n' +
        '      Error: FAILED\n' +
        '          at World'
    )
  })
})
