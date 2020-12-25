import 'should'

import { args, exec } from './exec'

describe('Data Table', () => {
  it('should log data table', () => {
    exec('test/features/data-table.feature', ...args).should.containEql(
      '    When data table\n' +
        '      │ foo   │ bar   │\n' +
        '      │ lorem │ ipsum │\n'
    )
  })
})
