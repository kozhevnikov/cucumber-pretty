import 'should'

import { run } from './exec'

describe('Scenario Outline', () => {
  it('should log scenario outline', () => {
    run('scenario-outline.feature', {
      '--name': 'Scenario outline',
    }).should.containEql(
      'Feature: Scenario Outline\n' +
        '\n' +
        '  Scenario Outline: Scenario outline\n' +
        '    When noop "bar"\n' +
        '\n' +
        '  Scenario Outline: Scenario outline\n' +
        '    When noop "baz"'
    )
  })
})
