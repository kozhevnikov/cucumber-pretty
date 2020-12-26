import { Formatter, Status } from '@cucumber/cucumber'
import { IFormatterOptions } from '@cucumber/cucumber/lib/formatter'
import {
  formatIssue,
  formatSummary,
} from '@cucumber/cucumber/lib/formatter/helpers'
import {
  getGherkinScenarioMap,
  getGherkinStepMap,
} from '@cucumber/cucumber/lib/formatter/helpers/gherkin_document_parser'
import { durationBetweenTimestamps } from '@cucumber/cucumber/lib/time'
import { getPickleStepMap } from '@cucumber/cucumber/lib/formatter/helpers/pickle_parser'
import { messages } from '@cucumber/messages'
import * as colors from 'colors'
import { cross, tick } from 'figures'
import { EOL as n } from 'os'

const marks = {
  [Status.AMBIGUOUS]: cross,
  [Status.FAILED]: cross,
  [Status.PASSED]: tick,
  [Status.PENDING]: '?',
  [Status.SKIPPED]: '-',
  [Status.UNDEFINED]: '?',
}

/** @see https://github.com/cli-table/cli-table3#custom-styles */
// const table = {
//   chars: {
//     top: '',
//     'top-left': '',
//     'top-mid': '',
//     'top-right': '',
//     mid: '',
//     'left-mid': '',
//     'mid-mid': '',
//     'right-mid': '',
//     bottom: '',
//     'bottom-left': '',
//     'bottom-mid': '',
//     'bottom-right': '',
//   },
//   style: {
//     head: [],
//     border: [],
//   },
// }

export default class PrettyFormatter extends Formatter {
  // TODO: review this:
  private uri?: string = undefined
  private errorCount = 0
  private colorsEnabled = false
  private testRunStartedTimestamp: messages.ITimestamp = {
    seconds: 0,
    nanos: 0,
  }

  constructor(options: IFormatterOptions) {
    super(options)
    this.colorsEnabled = !!options.parsedArgvOptions.colorsEnabled
    this.parseEnvelope = this.parseEnvelope.bind(this)

    options.eventBroadcaster.on('envelope', this.parseEnvelope)
  }

  private parseEnvelope(envelope: messages.Envelope) {
    if (envelope.testRunStarted) this.onTestRunStarted(envelope.testRunStarted)
    if (envelope.testCaseStarted)
      this.onTestCaseStarted(envelope.testCaseStarted)
    if (envelope.testStepStarted)
      this.onTestStepStarted(envelope.testStepStarted)
    if (envelope.testStepFinished)
      this.onTestStepFinished(envelope.testStepFinished)
    if (envelope.testCaseFinished)
      this.onTestCaseFinished(envelope.testCaseFinished)
    if (envelope.testRunFinished)
      this.onTestRunFinished(envelope.testRunFinished)
  }

  private onTestRunStarted(testRunStarted: messages.ITestRunStarted) {
    this.testRunStartedTimestamp =
      typeof testRunStarted.timestamp === 'number'
        ? testRunStarted.timestamp
        : { seconds: 0, nanos: 0 }
  }

  private onTestCaseStarted(testCaseStarted: messages.ITestCaseStarted) {
    const {
      gherkinDocument,
      pickle,
    } = this.eventDataCollector.getTestCaseAttempt(testCaseStarted.id || '')
    const { feature } = gherkinDocument
    if (this.uri !== gherkinDocument.uri && feature) {
      if (this.uri) this.logn()
      this.renderFeatureHead(feature)
      // TODO: what do we do when there is no URI?
      this.uri = gherkinDocument.uri || ''
    }

    this.renderScenarioHead(gherkinDocument, pickle)
  }

  private onTestStepStarted(testStepStarted: messages.ITestStepStarted) {
    const {
      gherkinDocument,
      pickle,
      testCase,
    } = this.eventDataCollector.getTestCaseAttempt(
      testStepStarted.testCaseStartedId || ''
    )

    const pickleStepMap = getPickleStepMap(pickle)
    const gherkinStepMap = getGherkinStepMap(gherkinDocument)
    const testStep = (testCase.testSteps || []).find(
      (item) => item.id === testStepStarted.testStepId
    )

    if (testStep && testStep.pickleStepId !== '') {
      const pickleStep = pickleStepMap[testStep.pickleStepId]
      const astNodeId = pickleStep.astNodeIds[0]
      const gherkinStep = gherkinStepMap[astNodeId]
      this.logn(
        `${this.color(gherkinStep.keyword.trim(), 'bold')} ${pickleStep.text}`,
        4
      )
    }
  }

  private onTestStepFinished(testStepFinished: messages.ITestStepFinished) {
    const { message, status } = testStepFinished.testStepResult || {}

    if (status && status !== Status.PASSED) {
      this.logn(
        this.colorFns.forStatus(status)(
          `${marks[status]} ${Status[status].toLowerCase()}`
        ),
        4
      )

      if (message) {
        const testCaseAttempt = this.eventDataCollector.getTestCaseAttempt(
          testStepFinished.testCaseStartedId || ''
        )
        const error = formatIssue({
          colorFns: this.colorFns,
          cwd: this.cwd,
          number: ++this.errorCount,
          snippetBuilder: this.snippetBuilder,
          supportCodeLibrary: this.supportCodeLibrary,
          testCaseAttempt,
        })
        this.logn(error, 6)
      }
    }
  }

  private onTestCaseFinished(_testCaseFinished: messages.ITestCaseFinished) {
    // this.logn()
  }

  private onTestRunFinished(testRunFinished: messages.ITestRunFinished) {
    const testRunDuration = durationBetweenTimestamps(
      this.testRunStartedTimestamp,
      testRunFinished.timestamp || { nanos: 0, seconds: 0 }
    )
    if (this.uri) this.logn()
    this.log(
      formatSummary({
        colorFns: this.colorFns,
        testCaseAttempts: this.eventDataCollector.getTestCaseAttempts(),
        testRunDuration,
      })
    )
  }

  private renderFeatureHead(feature: messages.GherkinDocument.IFeature) {
    const tags = (feature?.tags || []).map((tag) => tag.name).join(' ')
    if (tags) this.logn(this.colorFns.tag(tags))
    this.logn(
      `${this.color(feature.keyword, 'magenta', 'bold')}: ${feature.name}`
    )

    if (feature.description) this.logn(`${n}${feature.description}`)
  }

  private renderScenarioHead(
    gherkinDocument: messages.IGherkinDocument,
    pickle: messages.IPickle
  ) {
    this.logn()
    const tags = (pickle.tags || []).map((tag) => tag.name).join(' ')
    if (tags) this.logn(this.colorFns.tag(tags), 2)
    const gherkinScenarioMap = getGherkinScenarioMap(gherkinDocument)
    if (!pickle.astNodeIds) throw new Error('Pickle AST nodes missing')
    const keyword = gherkinScenarioMap[pickle.astNodeIds[0]].keyword
    this.logn(`${this.color(keyword, 'magenta', 'bold')}: ${pickle.name}`, 2)
  }

  private logn(value = '', indent = 0) {
    let text = value.toString()
    if (indent > 0) text = text.replace(/^/gm, ' '.repeat(indent))
    this.log(`${text}${n}`)
  }

  private color(value: any, ...color: any[]) {
    return this.colorsEnabled
      ? color.reduce((v, c) => v[c], colors)(value)
      : value
  }
}
