import 'should'

import { args, exec } from './exec'

describe('Doc String', () => {
  it('should log doc string', () => {
    exec('test/features/doc-string.feature', ...args).should.containEql(
      '    When doc string\n' +
        '      """\n' +
        '      foo\n' +
        '      bar\n' +
        '      """\n'
    )
  })
})
