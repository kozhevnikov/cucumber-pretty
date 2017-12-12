const { SummaryFormatter, formatterHelpers } = require('cucumber');
const { cross, tick } = require('figures');
const { EOL } = require('os');

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
const CHARACTERS = {
  ambiguous: cross,
  failed: cross,
  passed: tick,
  pending: '?',
  skipped: '-',
  undefined: '?'
};

class PrettyFormatter extends SummaryFormatter {
  /** @param {Options} options */
  constructor(options) {
    super(options);

    options.colorFns.setTheme({
      feature: ['magenta', 'bold'],
      scenario: ['magenta', 'bold'],
      step: 'blue'
    });

    this.features = [];

    options.eventBroadcaster.on('test-case-started', ({ sourceLocation }) => {
      const { gherkinDocument, pickle } = options.eventDataCollector.getTestCaseData(sourceLocation);

      if (!this.features.includes(sourceLocation.uri)) {
        this.features.push(sourceLocation.uri);

        if (this.features.length > 1) options.log(EOL);

        const { feature } = gherkinDocument;
        options.log(`${options.colorFns.feature(feature.keyword)}: ${feature.name}${EOL}`);
      }

      options.log(EOL);
      options.log(`  ${options.colorFns.scenario('Scenario')}: ${pickle.name}${EOL}`);
    });

    options.eventBroadcaster.on('test-step-started', (event) => {
      const { gherkinKeyword, pickleStep } = options.eventDataCollector.getTestStepData(event);
      options.log(`    ${options.colorFns.step(gherkinKeyword.trim())} ${pickleStep.text}${EOL}`);
    });

    options.eventBroadcaster.on('test-step-finished', (event) => {
      const { testStep: { result: { status, exception } } } = options.eventDataCollector.getTestStepData(event);

      if (status !== 'passed') {
        options.log(`    ${CHARACTERS[status]} ${status}${EOL}`);
      }

      if (exception) {
        const error = formatterHelpers.formatError(exception, options.colorFns).replace(/^/gm, '      ');
        options.log(`${error}${EOL}`);
      }
    });
  }
}

module.exports = PrettyFormatter;
