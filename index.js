const { SummaryFormatter } = require('cucumber');
const { EOL } = require('os');

/**
 * @typedef {Object} Options
 * @property colorFns - a series of helper functions for outputting colors
 * @property colorsEnabled
 * @property cwd - the current working directory
 * @property {EventEmitter} eventBroadcaster - an event emitter that emits the event protocol
 * @property {EventDataCollector} eventDataCollector - handles grouping the data for related events
 * @property log - function which will write the passed string to the the designated stream
 * @property snippetBuilder - a build method that should be called with {keywordType, pickleStep}
 * @property stream - the underlying stream the formatter is writing to
 * @property supportCodeLibrary
 * @see https://github.com/cucumber/cucumber-js/blob/master/docs/custom_formatters.md
 */

class PrettyFormatter extends SummaryFormatter {
  /** @param {Options} options */
  constructor(options) {
    super(options);

    options.eventBroadcaster.on('test-case-started', ({ sourceLocation }) => {
      const { pickle } = options.eventDataCollector.getTestCaseData(sourceLocation);
      options.log(`  Scenario: ${pickle.name}${EOL}`);
    });

    options.eventBroadcaster.on('test-step-started', (event) => {
      const { gherkinKeyword, pickleStep } = options.eventDataCollector.getTestStepData(event);
      options.log(`    ${gherkinKeyword}${pickleStep.text}${EOL}`);
    });
  }
}

module.exports = PrettyFormatter;
