import 'should'

import { run } from './exec'

describe('Scenario Outline', () => {
  it('logs scenario outlines', () => {
    run('scenario-outline.feature', {
      '--name': 'Scenario outline',
    }).should.containEql(
      // TODO: use the example location when running a scenario outline
      'Feature: Scenario Outline # test/features/scenario-outline.feature:1\n' +
        '\n' +
        '  Scenario Outline: Scenario outline # test/features/scenario-outline.feature:3\n' +
        '    When noop "bar"\n' +
        '\n' +
        '  Scenario Outline: Scenario outline # test/features/scenario-outline.feature:3\n' +
        '    When noop "baz"'
    )
  })
})
