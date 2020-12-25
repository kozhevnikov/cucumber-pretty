import { execFileSync } from 'child_process'
import { resolve } from 'path'

const cmd = 'node_modules/.bin/cucumber-js'

export const args = [
  '--format',
  '.',
  '--format-options',
  JSON.stringify({ colorsEnabled: false }),
]

// TODO: fix:
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exec = (...args: any[]): string => {
  args = [
    '--require-module',
    'ts-node/register',
    '--require',
    resolve(__dirname, '..', 'lib', 'test'),
    ...args,
  ]
  console.log(`${cmd} ${args.join(' ')}`)

  let stdout: string
  try {
    stdout = execFileSync(cmd, args).toString()
  } catch (error) {
    stdout = error.stdout.toString()
  }

  console.log(stdout)
  return stdout
}
