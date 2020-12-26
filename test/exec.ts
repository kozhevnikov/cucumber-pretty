import { execFileSync } from 'child_process'
import { join } from 'path'

const cmd = 'node_modules/.bin/cucumber-js'

type RunOptionalOptions = {
  '--name'?: string
}
type RunOptions = {
  colorsEnabled?: boolean
}
type FinalRunOptions = RunOptionalOptions & Required<RunOptions>

export const run = (
  fileName: string,
  options: RunOptions & RunOptionalOptions = {}
): string => {
  const finalOptions: FinalRunOptions = { colorsEnabled: false, ...options }
  const args = [
    '--format',
    join(__dirname, '..', 'lib', 'src'),
    '--format-options',
    JSON.stringify({ colorsEnabled: finalOptions.colorsEnabled }),
  ]
  if (options['--name']) args.push('--name', options['--name'])

  return exec(...args, join('test', 'features', fileName))
}

// TODO: remove
/** @deprecated */
export const args = [
  '--format',
  join(__dirname, '..', 'lib', 'src'),
  '--format-options',
  JSON.stringify({ colorsEnabled: false }),
]

// TODO: remove
// eslint-disable-next-line @typescript-eslint/no-explicit-any
/** @deprecated */
export const exec = (...args: any[]): string => {
  args = [
    '--publish-quiet',
    '--require-module',
    'ts-node/register',
    '--require',
    join(__dirname, '..', 'lib', 'test'),
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
