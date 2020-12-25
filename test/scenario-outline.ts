import 'should'

import { args, exec } from './exec'

describe('Scenario Outline', () => {
  it('should log scenario outline', () => {
    exec(
      'test/features/scenario-outline.feature',
      '--name',
      'Scenario outline',
      ...args
    ).should.containEql(
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
