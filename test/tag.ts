import 'should'

import { run } from './exec'

describe('Tag', () => {
  it('should log feature tag', () => {
    run('tag.feature', { '--name': 'Feature tag' }).should.startWith(
      '@feature @tag\n' + 'Feature: Tag\n'
    )
  })

  it('should log new line', () => {
    run('*.feature', { '--name': 'Feature .*' }).should.containEql(
      '\n' + '@feature @tag\n' + 'Feature: Tag\n'
    )
  })

  it('should log scenario tag', () => {
    run('tag.feature', { '--name': 'Scenario tag' }).should.containEql(
      '  @feature @tag @scenario\n' + '  Scenario: Scenario tag\n'
    )
  })

  it('should log scenario outline tag', () => {
    run('tag.feature', { '--name': 'Scenario outline tag' }).should.containEql(
      '  @feature @tag @scenario-outline @example\n' +
        '  Scenario Outline: Scenario outline tag\n'
    )
  })
})
