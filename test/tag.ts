import 'should'

import { args, exec } from './exec'

describe('Tag', () => {
  it('should log feature tag', () => {
    exec(
      'test/features/tag.feature',
      '--name',
      'Feature tag',
      ...args
    ).should.startWith('@feature @tag\n' + 'Feature: Tag\n')
  })

  it('should log new line', () => {
    exec('test/features/', '--name', 'Feature .*', ...args).should.containEql(
      '\n' + '@feature @tag\n' + 'Feature: Tag\n'
    )
  })

  it('should log scenario tag', () => {
    exec(
      'test/features/tag.feature',
      '--name',
      'Scenario tag',
      ...args
    ).should.containEql(
      '  @feature @tag @scenario\n' + '  Scenario: Scenario tag\n'
    )
  })

  it('should log scenario outline tag', () => {
    exec(
      'test/features/tag.feature',
      '--name',
      'Scenario outline tag',
      ...args
    ).should.containEql(
      '  @feature @tag @scenario-outline @example\n' +
        '  Scenario Outline: Scenario outline tag\n'
    )
  })
})
