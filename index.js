const { SummaryFormatter } = require('cucumber');

class PrettyFormatter extends SummaryFormatter {
  /**
   * @property colorFns - a series of helper functions for outputting colors
   * @property cwd - the current working directory
   * @property eventDataCollector - an instance of EventDataCollector which handles the complexity of grouping the data for related events
   * @property log - function which will write the passed string to the the designated stream
   * @property snippetBuilder - an object with a build method that should be called with {keywordType, pickleStep}
   * @property stream - the underlying stream the formatter is writing to
   * @property supportCodeLibrary
   *
   * @see https://github.com/cucumber/cucumber-js/blob/master/docs/custom_formatters.md
   */
  constructor(options) {
    super(options);

    /**
     * @property colorsEnabled
     * @property eventBroadcaster - an event emitter that emits the event protocol
     */
    this.options = options;
  }
}

module.exports = PrettyFormatter;
