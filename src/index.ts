import { Status, SummaryFormatter } from '@cucumber/cucumber'
import { IFormatterOptions } from '@cucumber/cucumber/lib/formatter'
import {
  getGherkinExampleRuleMap,
  getGherkinScenarioMap,
  getGherkinStepMap,
} from '@cucumber/cucumber/lib/formatter/helpers/gherkin_document_parser'
import { getPickleStepMap } from '@cucumber/cucumber/lib/formatter/helpers/pickle_parser'
import { messages } from '@cucumber/messages'
import * as CliTable3 from 'cli-table3'
import { bold, magenta } from 'colors/safe'
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

type TextStyle = 'bold' | 'magenta'
type StyleFunction = (text: string) => string
const styleDefs: { [key in TextStyle]: StyleFunction } = {
  bold,
  magenta,
}

const tableLayout = {
  chars: {
    top: '',
    'top-left': '',
    'top-mid': '',
    'top-right': '',
    mid: '',
    'left-mid': '',
    'mid-mid': '',
    'right-mid': '',
    bottom: '',
    'bottom-left': '',
    'bottom-mid': '',
    'bottom-right': '',
  },
  style: {
    head: [],
    border: [],
  },
}

export default class PrettyFormatter extends SummaryFormatter {
  private uri?: string
  private lastRuleId?: string
  private indentOffset = 0
  private colorsEnabled = false

  constructor(options: IFormatterOptions) {
    super(options)
    this.colorsEnabled = !!options.parsedArgvOptions.colorsEnabled
    this.parseEnvelope = this.parseEnvelope.bind(this)

    options.eventBroadcaster.on('envelope', this.parseEnvelope)
  }

  private parseEnvelope(envelope: messages.Envelope) {
    if (envelope.testCaseStarted)
      this.onTestCaseStarted(envelope.testCaseStarted)
    if (envelope.testStepStarted)
      this.onTestStepStarted(envelope.testStepStarted)
    if (envelope.testStepFinished)
      this.onTestStepFinished(envelope.testStepFinished)
    if (envelope.testCaseFinished)
      this.onTestCaseFinished(envelope.testCaseFinished)
  }

  private onTestCaseStarted(testCaseStarted: messages.ITestCaseStarted) {
    const {
      gherkinDocument,
      pickle,
    } = this.eventDataCollector.getTestCaseAttempt(testCaseStarted.id || '')
    const { feature } = gherkinDocument
    if (this.uri !== gherkinDocument.uri && feature) {
      this.renderFeatureHead(feature)
      // TODO: what do we do when there is no URI?
      this.uri = gherkinDocument.uri || ''
      this.lastRuleId = undefined
      this.indentOffset = 0
    }

    const gherkinExampleRuleMap = getGherkinExampleRuleMap(gherkinDocument)
    if (!pickle.astNodeIds) throw new Error('Pickle AST nodes missing')
    const rule = gherkinExampleRuleMap[pickle.astNodeIds[0]]
    if (rule && rule.id !== this.lastRuleId) {
      this.indentOffset = 0
      this.renderRule(rule)
      this.lastRuleId = rule.id
      this.indentOffset = 2
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
        `${this.style(gherkinStep.keyword.trim(), 'bold')} ${pickleStep.text}`,
        4
      )

      if (gherkinStep.docString) {
        this.logn(
          `${gherkinStep.docString.delimiter}\n${gherkinStep.docString.content}\n${gherkinStep.docString.delimiter}\n`,
          6
        )
      }

      if (gherkinStep.dataTable) {
        const datatable = new CliTable3(tableLayout)
        datatable.push(
          ...gherkinStep.dataTable.rows.map(
            (row: messages.GherkinDocument.Feature.ITableRow) =>
              (row.cells || []).map((cell) => cell.value)
          )
        )
        this.logn(datatable.toString(), 6)
      }
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

      if (message) this.logn(message, 6)
    }
  }

  private onTestCaseFinished(_testCaseFinished: messages.ITestCaseFinished) {
    this.logn()
  }

  private renderFeatureHead(feature: messages.GherkinDocument.IFeature) {
    const tags = (feature?.tags || []).map((tag) => tag.name).join(' ')
    if (tags) this.logn(this.colorFns.tag(tags))
    this.logn(
      `${this.style(feature.keyword || '[feature]', 'magenta', 'bold')}: ${
        feature.name
      }`
    )

    if (feature.description) this.logn(`${n}${feature.description}`)
    this.logn()
  }

  private renderScenarioHead(
    gherkinDocument: messages.IGherkinDocument,
    pickle: messages.IPickle
  ) {
    const tags = (pickle.tags || []).map((tag) => tag.name).join(' ')
    if (tags) this.logn(this.colorFns.tag(tags), 2)
    const gherkinScenarioMap = getGherkinScenarioMap(gherkinDocument)
    if (!pickle.astNodeIds) throw new Error('Pickle AST nodes missing')

    const keyword = gherkinScenarioMap[pickle.astNodeIds[0]].keyword
    this.logn(`${this.style(keyword, 'magenta', 'bold')}: ${pickle.name}`, 2)
  }

  private renderRule(rule: messages.GherkinDocument.Feature.FeatureChild.Rule) {
    this.logn(`${this.style(rule.keyword, 'magenta', 'bold')}: ${rule.name}`, 2)
    this.logn()
  }

  private logn(value = '', indent = 0) {
    let text = value.toString()
    if (text.trim().length > 0) indent = indent + this.indentOffset
    if (indent > 0) text = text.replace(/^/gm, ' '.repeat(indent))
    this.log(`${text}${n}`)
  }

  private style(text: string, ...styles: TextStyle[]) {
    return this.colorsEnabled ? this.styleText(text, ...styles) : text
  }

  private styleText(text: string, ...styles: TextStyle[]) {
    return styles.reduce<StyleFunction>(
      (fn, style) => (text) => fn(styleDefs[style](text)),
      (text) => text
    )(text)
  }
}
