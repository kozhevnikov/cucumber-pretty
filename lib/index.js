"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const formatterHelpers = require("cucumber/lib/formatter/helpers");
const figures_1 = require("figures");
const Table = require("cli-table3");
const colors = require("colors");
const os_1 = require("os");
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
    ambiguous: figures_1.cross,
    failed: figures_1.cross,
    passed: figures_1.tick,
    pending: '?',
    skipped: '-',
    undefined: '?',
};
/** @see https://github.com/cli-table/cli-table3#custom-styles */
const table = {
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
};
class PrettyFormatter extends cucumber_1.Formatter {
    constructor(options) {
        super(options);
        this.uri = undefined;
        this.colorsEnabled = options.colorsEnabled;
        this.descriptionEnabled = options.descriptionEnabled;
        options.eventBroadcaster.on('test-case-started', (event) => {
            const { gherkinDocument, pickle, } = options.eventDataCollector.getTestCaseAttempt(event);
            if (this.uri !== event.sourceLocation.uri) {
                const { feature } = gherkinDocument;
                if (this.uri)
                    this.logn();
                const tags = feature.tags.map((tag) => tag.name).join(' ');
                if (tags)
                    this.logn(options.colorFns.tag(tags));
                this.logn(`${this.color(feature.keyword, 'magenta', 'bold')}: ${feature.name}`);
                if (feature.description && this.descriptionEnabled)
                    this.logn(`${os_1.EOL}${feature.description}`);
                this.uri = event.sourceLocation.uri;
            }
            this.logn();
            const tags = pickle.tags.map((tag) => tag.name).join(' ');
            if (tags)
                this.logn(options.colorFns.tag(tags), 2);
            const line = Math.min(...pickle.locations.map((location) => location.line));
            const { keyword } = gherkinDocument.feature.children.find((child) => child.location.line === line);
            this.logn(`${this.color(keyword, 'magenta', 'bold')}: ${pickle.name}`, 2);
        });
        options.eventBroadcaster.on('test-step-started', (event) => {
            const testCaseAttempt = options.eventDataCollector.getTestCaseAttempt(event.testCase);
            testCaseAttempt.stepResults = testCaseAttempt.testCase.steps.map(() => ({}));
            const testStep = formatterHelpers.parseTestCaseAttempt({
                testCaseAttempt,
            }).testSteps[event.index];
            if (!testStep.sourceLocation)
                return; // hook
            this.logn(`${this.color(testStep.keyword.trim(), 'bold')} ${testStep.text}`, 4);
            testStep.arguments.forEach((argument) => {
                if (argument.content) {
                    this.logn(`"""${os_1.EOL}${argument.content}${os_1.EOL}"""`, 6);
                }
                if (argument.rows) {
                    const datatable = new Table(table);
                    datatable.push(...argument.rows);
                    this.logn(datatable.toString(), 6);
                }
            });
        });
        options.eventBroadcaster.on('test-step-finished', (event) => {
            const { result: { status, exception }, } = event;
            if (status !== 'passed') {
                this.logn(options.colorFns[status](`${marks[status]} ${status}`), 4);
            }
            if (exception) {
                const error = formatterHelpers.formatError(exception, options.colorFns);
                this.logn(error, 6);
            }
        });
        options.eventBroadcaster.on('test-run-finished', (event) => {
            const noptions = Object.create(options, {
                eventBroadcaster: { value: { on: () => { } } },
            });
            const formatter = new cucumber_1.SummaryFormatter(noptions);
            if (this.uri)
                this.logn();
            formatter.logSummary(event);
        });
    }
    color(value, ...color) {
        return this.colorsEnabled
            ? color.reduce((v, c) => v[c], colors)(value)
            : value;
    }
    logn(value = '', indent = 0) {
        let text = value.toString();
        if (indent > 0)
            text = text.replace(/^/gm, ' '.repeat(indent));
        this.log(`${text}${os_1.EOL}`);
    }
}
module.exports = PrettyFormatter;
//# sourceMappingURL=index.js.map