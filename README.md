# Cucumber Pretty

[![build][build-badge]][build]
[![npm][version]][npm]
[![npm][downloads]][npm]

[build]: https://github.com/jbpros/cucumber-pretty/actions?query=workflow%3Abuild
[build-badge]: https://github.com/jbpros/cucumber-pretty/workflows/build/badge.svg
[npm]: https://www.npmjs.com/package/cucumber-pretty
[version]: https://img.shields.io/npm/v/cucumber-pretty.svg
[downloads]: https://img.shields.io/npm/dm/cucumber-pretty.svg

Cucumber.js pretty formatter implementing event protocol.

Built with 🥒 by [Ilya Kozhevnikov](http://kozhevnikov.com/).

## Use

```bash
npm i cucumber-pretty
cucumber-js -f node_modules/cucumber-pretty
```

- For Cucumber.js versions 1 and 2 use `-f pretty`
- For Cucumber.js versions 3 to 5 use `cucumber-pretty@1.5`
- For Cucumber.js version 6 use `cucumber-pretty@6`
- The pretty formatter is [not yet compatible with Cucumber.js 7](https://github.com/kozhevnikov/cucumber-pretty/issues/14).

## References

- https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#formats
- https://github.com/cucumber/cucumber-js/blob/master/docs/custom_formatters.md

## Customise the theme

You can define your own colors by passing a `theme` format option:

    --format-options '{"theme": <THEME_JSON>}'

Where `THEME_JSON` is in the following shape:

```json
{"feature keyword": ["magenta", "bold"], "scenario keyword": ["red"]}
```

The currently known theme items are:

* `datatable`: all data table elements (border and content)
* `datatable border`
* `datatable content`
* `docstring content`: multiline argument content
* `docstring delimiter`: multiline argument delimiter: `"""`
* `feature description`
* `feature keyword`
* `rule keyword`
* `scenario keyword`
* `step keyword`
* `step message`: usually a failing step error message and stack trace
* `step text`
* `tag`

You can combine all the styles you'd like from [modifiers, foreground colors and background colors exposed by ansi-styles](https://github.com/chalk/ansi-styles#styles).

### Example Themes

_Matrix_:

    --format-options '{"theme":{"datatable border":["green"],"datatable content":["green","italic"],"docstring content":["green","italic"],"docstring delimiter":["green"],"feature description":["green"],"feature keyword":["bold","green"],"rule keyword":["yellow"],"scenario keyword":["greenBright"],"step keyword":["bgGreen","black","italic"],"step text":["greenBright","italic"],"tag":["green"]}}'

_Original pretty_:

This was the default theme, pre-Cucumber.js 7.x.

<img src="https://raw.githubusercontent.com/kozhevnikov/cucumber-pretty/master/docs/homebrew.png" width="300">
<img src="https://raw.githubusercontent.com/kozhevnikov/cucumber-pretty/master/docs/basic.png" width="300">

    --format-options '{"theme":{"feature keyword":["magenta","bold"],"scenario keyword":["magenta","bold"],"step keyword":["bold"]}}'

