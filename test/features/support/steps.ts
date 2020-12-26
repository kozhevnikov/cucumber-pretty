import { DataTable, defineStep } from '@cucumber/cucumber'

import { World } from './World'

const noop = () => {}

defineStep('noop', noop)
defineStep('noop {string}', (_: string) => {})
defineStep('ambiguous', noop)
defineStep('ambiguous', noop)
defineStep('failed', () => {
  throw new Error('FAILED')
})
defineStep('passed', noop)
defineStep('pending', () => 'pending')
defineStep('skipped', () => 'skipped')
defineStep('doc string:', (_: string) => {})
defineStep('data table:', (_: DataTable) => {})
defineStep('world', function (this: World) {
  this.someWorldMethod()
})
