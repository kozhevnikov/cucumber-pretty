import 'should'

import { run } from './exec'

describe('Doc String', () => {
  it('should log doc string', () => {
    run('doc-string.feature').should.containEql(
      '    When doc string:\n' +
        '      """\n' +
        '      foo\n' +
        '      bar\n' +
        '      """\n'
    )
  })
})
