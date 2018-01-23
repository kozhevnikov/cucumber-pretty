const { Formatter, SummaryFormatter, formatterHelpers } = require('cucumber');
const Table = require('cli-table');
const { cross, tick } = require('figures');
const { EOL: n } = require('os');

/**
 * @typedef {Object} Options
 * @property colorFns - a series of helper functions for outputting colors
 * @property colorsEnabled
 * @property cwd - the current working directory
 * @property {EventEmitter} eventBroadcaster - an event emitter that emits the event protocol
 * @property {EventDataCollector} eventDataCollector - an instance of EventDataCollector which handles the complexity of grouping the data for related events
 * @property log - function which will write the passed string to the the designated stream
 * @property snippetBuilder - an object with a build method that should be called with {keywordType, pickleStep}
 * @property stream - the underlying stream the formatter is writing to
 * @property supportCodeLibrary
 * @see https://github.com/cucumber/cucumber-js/blob/master/docs/custom_formatters.md
 */

/** @see https://github.com/cucumber/cucumber-js/blob/master/src/formatter/helpers/issue_helpers.js */
const marks = {
  ambiguous: cross,
  failed: cross,
  passed: tick,
  pending: '?',
  skipped: '-',
  undefined: '?'
};

/** @see https://github.com/Marak/colors.js#custom-themes */
const theme = {
  feature: ['magenta', 'bold'],
  scenario: ['magenta', 'bold'],
  step: 'bold'
};

/** @see https://github.com/Automattic/cli-table#custom-styles */
const table = {
  chars: {
    top: '', 'top-left': '', 'top-mid': '', 'top-right': '',
    mid: '', 'left-mid': '', 'mid-mid': '', 'right-mid': '',
    bottom: '', 'bottom-left': '', 'bottom-mid': '', 'bottom-right': ''
  }
};

class PrettyFormatter extends Formatter {
  /** @param {Options} options */
  constructor(options) {
    super(options);

    options.colorFns.setTheme(theme);

    let source;

    options.eventBroadcaster.on('test-case-started', ({ sourceLocation }) => {
      const { gherkinDocument, pickle } = options.eventDataCollector.getTestCaseData(sourceLocation);

      if (source !== sourceLocation.uri) {
        const { feature } = gherkinDocument;

        if (source) this.logn();

        const tags = feature.tags.map(tag => tag.name).join(' ');
        if (tags) this.logn(options.colorFns.tag(tags));

        this.logn(`${options.colorFns.feature(feature.keyword)}: ${feature.name}`);

        if (feature.description) this.logn(`${n}${feature.description}`);

        source = sourceLocation.uri;
      }

      this.logn();

      const tags = pickle.tags.map(tag => tag.name).join(' ');
      if (tags) this.logn(options.colorFns.tag(tags), 2);

      const line = Math.min(...pickle.locations.map(location => location.line));
      const { keyword } = gherkinDocument.feature.children.find(child => child.location.line === line);

      this.logn(`${options.colorFns.scenario(keyword)}: ${pickle.name}`, 2);
    });

    options.eventBroadcaster.on('test-step-started', (event) => {
      const { gherkinKeyword, pickleStep } = options.eventDataCollector.getTestStepData(event);
      if (!gherkinKeyword) return; // hook

      this.logn(`${options.colorFns.step(gherkinKeyword.trim())} ${pickleStep.text}`, 4);

      pickleStep.arguments.forEach((argument) => {
        if (argument.content) {
          this.logn(`"""${n}${argument.content}${n}"""`, 6);
        }

        if (argument.rows) {
          const datatable = new Table(table);
          datatable.push(...argument.rows.map(row => row.cells.map(cell => cell.value)));
          this.logn(datatable, 6);
        }
      });
    });

    options.eventBroadcaster.on('test-step-finished', (event) => {
      const { testStep: { result: { status, exception } } } = options.eventDataCollector.getTestStepData(event);

      if (status !== 'passed') {
        this.logn(options.colorFns[status](`${marks[status]} ${status}`), 4);
      }

      if (exception) {
        const error = formatterHelpers.formatError(exception, options.colorFns);
        this.logn(error, 6);
      }
    });

    options.eventBroadcaster.on('test-run-finished', (event) => {
      const noptions = Object.create(options, { eventBroadcaster: { value: { on: () => {} } } });
      const formatter = new SummaryFormatter(noptions);
      if (source) this.logn();
      formatter.logSummary(event);
    });
  }

  logn(value = '', indent = 0) {
    let text = value.toString();
    if (indent > 0) text = text.replace(/^/gm, ' '.repeat(indent));
    this.log(`${text}${n}`);
  }
}

module.exports = PrettyFormatter;
