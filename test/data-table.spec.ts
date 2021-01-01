import 'should'

import { run } from './exec'

describe('Data Table', () => {
  it('logs data tables', () => {
    run('data-table.feature').should.containEql(
      '    When data table:\n' +
        '      │ foo   │ bar   │\n' +
        '      │ lorem │ ipsum │\n'
    )
  })
})
