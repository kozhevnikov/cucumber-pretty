import 'should'

import { exec } from './exec'

const args = ['--format', '.']

describe('World', () => {
  it('should not throw colors error', () => {
    exec('test/features/world.feature', ...args).should.containEql(
      '\n\u001b[34mWORLD\u001b[39m\n'
    )
  })
})
