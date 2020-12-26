import 'should'

import { run } from './exec'

describe('Data Table', () => {
  it('should log data table', () => {
    run('data-table.feature').should.containEql(
      '    When data table:\n' +
        '      │ foo   │ bar   │\n' +
        '      │ lorem │ ipsum │\n'
    )
  })
})
