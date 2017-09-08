const { Formatter } = require('cucumber');
const { EOL } = require('os');

class PrettyFormatter extends Formatter {
  constructor(options) {
    super(options);
    /**
     * @property colorFns - a series of helper functions for outputting colors
     * @property colorsEnabled
     * @property cwd - the current working directory
     * @property eventBroadcaster - an event emitter that emits the event protocol
     * @property eventDataCollector - an instance of EventDataCollector which handles the complexity of grouping the data for related events
     * @property log - function which will write the passed string to the the designated stream
     * @property snippetBuilder - an object with a build method that should be called with {keywordType, pickleStep}
     * @property stream - the underlying stream the formatter is writing to
     * @property supportCodeLibrary
     * @see https://docs.cucumber.io/event-protocol/
     * @see https://github.com/cucumber/cucumber-js/blob/master/docs/custom_formatters.md
     */
    this.options = options;

    options.eventBroadcaster.on('test-case-started', event => {
      const data = this.eventDataCollector.getTestCaseData(event.sourceLocation);
      this.log(`  Scenario: ${data.pickle.name}${EOL}`);
    });

    options.eventBroadcaster.on('test-step-started', event => {
      const data = this.eventDataCollector.getTestStepData(event);
      if (data.testStep.sourceLocation) {
        this.log(`    ${data.gherkinKeyword}${data.pickleStep.text}${EOL}`);
      }
    });

    options.eventBroadcaster.on('test-step-finished', event => {
      const data = this.eventDataCollector.getTestStepData(event);
      if (data.testStep.sourceLocation) {
        const colorFn = this.colorFns[event.result.status];
        this.log(colorFn(`      ${event.result.status}${EOL}`));
      }
    });

    options.eventBroadcaster.on('test-case-finished', event => {
      this.log(EOL);
    });
  }
}

module.exports = PrettyFormatter;
