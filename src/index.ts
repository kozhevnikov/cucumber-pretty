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
import { cross, tick } from 'figures'
import { EOL as n } from 'os'
import dedent from 'ts-dedent'

import { makeTheme, ThemeItem, ThemeStyles } from './theme'

const marks = {
  [Status.AMBIGUOUS]: cross,
  [Status.FAILED]: cross,
  [Status.PASSED]: tick,
  [Status.PENDING]: '?',
  [Status.SKIPPED]: '-',
  [Status.UNDEFINED]: '?',
}

const defaultThemeStyles: ThemeStyles = {
  [ThemeItem.DataTable]: [],
  [ThemeItem.DataTableBorder]: ['gray'],
  [ThemeItem.DataTableContent]: ['gray', 'italic'],
  [ThemeItem.DocStringContent]: ['gray', 'italic'],
  [ThemeItem.DocStringDelimiter]: ['gray'],
  [ThemeItem.FeatureDescription]: ['gray'],
  [ThemeItem.FeatureKeyword]: ['blue', 'bold'],
  [ThemeItem.RuleKeyword]: ['blue', 'bold'],
  [ThemeItem.ScenarioKeyword]: ['cyan'],
  [ThemeItem.StepKeyword]: ['cyan', 'bold'],
  [ThemeItem.StepText]: ['bold'],
}

export default class PrettyFormatter extends SummaryFormatter {
  private uri?: string
  private lastRuleId?: string
  private indentOffset = 0
  private logItem: (indent: number, item: ThemeItem, ...text: string[]) => void
  private styleItem: (
    indent: number,
    item: ThemeItem,
    ...text: string[]
  ) => string
  private tableLayout: CliTable3.TableConstructorOptions

  constructor(options: IFormatterOptions) {
    super(options)
    const theme = makeTheme(
      !!options.parsedArgvOptions.colorsEnabled
        ? options.parsedArgvOptions.theme || defaultThemeStyles
        : {}
    )

    this.styleItem = (indent: number, item: ThemeItem, ...text: string[]) => {
      if (indent > 0 && this.indentOffset > 0)
        indent = indent + this.indentOffset
      return theme.indentStyleText(indent, item, ...text)
    }

    this.logItem = (indent: number, item: ThemeItem, ...text: string[]) =>
      this.log(this.styleItem(indent, item, ...text))

    this.parseEnvelope = this.parseEnvelope.bind(this)

    const tableFrameChar = theme.indentStyleText(
      0,
      ThemeItem.DataTableBorder,
      '│'
    )

    this.tableLayout = {
      chars: {
        left: tableFrameChar,
        middle: tableFrameChar,
        right: tableFrameChar,
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
      this.indentOffset = 0
      this.uri = gherkinDocument.uri || ''
      this.lastRuleId = undefined
      this.renderFeatureHead(feature)
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
      this.logItem(4, ThemeItem.StepKeyword, gherkinStep.keyword)
      this.log(' ')
      this.logItem(0, ThemeItem.StepText, pickleStep.text)
      this.newline()

      if (gherkinStep.docString) {
        // TODO: Add generic DocString style, similar DataTable
        this.logItem(
          6,
          ThemeItem.DocStringDelimiter,
          gherkinStep.docString.delimiter
        )
        this.newline()
        this.logItem(
          6,
          ThemeItem.DocStringContent,
          gherkinStep.docString.content
        )
        this.newline()
        this.logItem(
          6,
          ThemeItem.DocStringDelimiter,
          gherkinStep.docString.delimiter
        )
        this.newline()
      }

      if (gherkinStep.dataTable) {
        const datatable = new CliTable3(this.tableLayout)
        datatable.push(
          ...gherkinStep.dataTable.rows.map(
            (row: messages.GherkinDocument.Feature.ITableRow) =>
              (row.cells || []).map((cell) =>
                this.styleItem(0, ThemeItem.DataTableContent, cell.value || '')
              )
          )
        )
        this.logItem(6, ThemeItem.DataTable, datatable.toString())
        this.newline()
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
    this.newline()
  }

  private renderFeatureHead(feature: messages.GherkinDocument.IFeature) {
    const tags = (feature?.tags || []).map((tag) => tag.name).join(' ')
    if (tags) this.logn(this.colorFns.tag(tags))
    this.logItem(
      0,
      ThemeItem.FeatureKeyword,
      feature.keyword || '[feature]',
      ':'
    )
    this.log(` ${feature.name || ''}`)
    this.newline()

    if (feature.description) {
      this.newline()
      this.logItem(
        2,
        ThemeItem.FeatureDescription,
        dedent(feature.description.trim())
      )
      this.newline()
    }

    this.newline()
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
    this.logItem(2, ThemeItem.ScenarioKeyword, keyword, ':')
    this.log(` ${pickle.name}${n}`)
  }

  private renderRule(rule: messages.GherkinDocument.Feature.FeatureChild.Rule) {
    this.logItem(2, ThemeItem.RuleKeyword, rule.keyword, ':')
    this.log(` ${rule.name}${n}${n}`)
  }

  private newline() {
    this.log(n)
  }

  // TODO: remove logn()
  private logn(value = '', indent = 0) {
    let text = value.toString()
    if (text.trim().length > 0) indent = indent + this.indentOffset
    if (indent > 0) text = text.replace(/^/gm, ' '.repeat(indent))
    this.log(`${text}${n}`)
  }
}
