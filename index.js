const { Formatter, SummaryFormatter, formatterHelpers } = require('cucumber');
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

class PrettyFormatter extends Formatter {
  /** @param {Options} options */
  constructor(options) {
    super(options);

    options.colorFns.setTheme({
      feature: ['magenta', 'bold'],
      scenario: ['magenta', 'bold'],
      step: 'blue'
    });

    let location;

    options.eventBroadcaster.on('test-case-started', ({ sourceLocation }) => {
      const { gherkinDocument, pickle } = options.eventDataCollector.getTestCaseData(sourceLocation);

      if (location !== sourceLocation.uri) {
        const { feature } = gherkinDocument;

        const tags = feature.tags.map(tag => tag.name).join(' ');
        if (tags) options.log(`${options.colorFns.tag(tags)}${EOL}`);

        options.log(`${location ? EOL : ''}${options.colorFns.feature(feature.keyword)}: ${feature.name}${EOL}`);
        location = sourceLocation.uri;
      }

      options.log(EOL);

      const tags = pickle.tags.map(tag => tag.name).join(' ');
      if (tags) options.log(`  ${options.colorFns.tag(tags)}${EOL}`);

      options.log(`  ${options.colorFns.scenario('Scenario')}: ${pickle.name}${EOL}`);
    });

    options.eventBroadcaster.on('test-step-started', (event) => {
      const { gherkinKeyword, pickleStep } = options.eventDataCollector.getTestStepData(event);
      if (!gherkinKeyword) return; // hook
      options.log(`    ${options.colorFns.step(gherkinKeyword.trim())} ${pickleStep.text}${EOL}`);
    });

    options.eventBroadcaster.on('test-step-finished', (event) => {
      const { testStep: { result: { status, exception } } } = options.eventDataCollector.getTestStepData(event);

      if (status !== 'passed') {
        options.log(`    ${options.colorFns[status](`${CHARACTERS[status]} ${status}`)}${EOL}`);
      }

      if (exception) {
        const error = formatterHelpers.formatError(exception, options.colorFns).replace(/^/gm, '      ');
        options.log(`${error}${EOL}`);
      }
    });

    options.eventBroadcaster.on('test-run-finished', (event) => {
      const noptions = Object.create(options, { eventBroadcaster: { value: { on: () => {} } } });
      const formatter = new SummaryFormatter(noptions);
      if (location) options.log(EOL);
      formatter.logSummary(event);
    });
  }
}

module.exports = PrettyFormatter;
