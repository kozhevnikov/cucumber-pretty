import { execFileSync } from 'child_process'
import { join } from 'path'

const cmd = 'node_modules/.bin/cucumber-js'

type RunOptionalOptions = {
  '--name'?: string
  '--tags'?: string[]
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
    '--publish-quiet',
    '--require',
    join(__dirname, 'features'),
    '--format',
    join(__dirname, '..', 'src'),
    '--format-options',
    JSON.stringify({ colorsEnabled: finalOptions.colorsEnabled }),
  ]
  if (options['--name']) args.push('--name', options['--name'])
  if (options['--tags']) args.push('--tags', options['--tags'].join(','))

  return exec(...args, join('test', 'features', fileName)).replace(
    /\d+m\d+\.\d+s/g,
    '0m00.000s'
  )
}

const exec = (...args: string[]): string => {
  if (process.env.LOG_CUCUMBER_RUN) console.log(`${cmd} ${args.join(' ')}`)

  let stdout: string
  try {
    stdout = execFileSync(cmd, args).toString()
  } catch (error) {
    stdout = error.stdout.toString()
  }

  if (process.env.LOG_CUCUMBER_RUN) console.log(stdout)
  return stdout
}
