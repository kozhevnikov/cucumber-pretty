/* eslint-disable no-unused-vars */
import { defineStep } from 'cucumber'

const noop = () => {}

defineStep('noop', noop)
defineStep('noop {string}', (_) => {})
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
defineStep('world', function world() {
  this.someWorldMethod()
})
