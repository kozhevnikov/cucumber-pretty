import 'should'

import { run } from './exec'

describe('Doc String', () => {
  it('logs doc strings', () => {
    run('doc-string.feature').should.containEql(
      '    When doc string:\n' +
        '      """\n' +
        '      foo\n' +
        '      bar\n' +
        '      """\n' +
        '    Then noop\n'
    )
  })
})
