import 'should'

import { run } from './exec'

describe('Tag', () => {
  it('log feature tags', () => {
    run('tag.feature', { '--name': 'Feature tag' }).should.startWith(
      '@feature @tag\n' + 'Feature: Tag\n'
    )
  })

  it('logs scenario tags', () => {
    run('tag.feature', { '--name': 'Scenario tag' }).should.containEql(
      '  @feature @tag @scenario\n' + '  Scenario: Scenario tag\n'
    )
  })

  it('logs scenario outline tags', () => {
    run('tag.feature', { '--name': 'Scenario outline tag' }).should.containEql(
      '  @feature @tag @scenario-outline @example\n' +
        '  Scenario Outline: Scenario outline tag\n'
    )
  })
})
