import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  setWorldConstructor,
} from '@cucumber/cucumber'

import { World } from './World'

setWorldConstructor(World)

if (process.argv.some((arg) => arg === 'test/features/hook.feature')) {
  BeforeAll(() => {
    console.log('[[[BeforeAll]]]')
  })
  AfterAll(() => {
    console.log('[[[AfterAll]]]')
  })
}

Before('@before', () => {
  console.log('[[[Before]]]')
})

After('@after', () => {
  console.log('[[[After]]]')
})
