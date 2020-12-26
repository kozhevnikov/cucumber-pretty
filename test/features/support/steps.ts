import { defineStep } from '@cucumber/cucumber'

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
defineStep('doc string', noop)
defineStep('data table', noop)
defineStep('world', function (this: any) {
  this.someWorldMethod()
})
