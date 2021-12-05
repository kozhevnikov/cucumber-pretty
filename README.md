# Cucumber Pretty

[![npm][version]][npm]
[![npm][downloads]][npm]

[npm]: https://www.npmjs.com/package/cucumber-pretty
[version]: https://img.shields.io/npm/v/cucumber-pretty.svg
[downloads]: https://img.shields.io/npm/dm/cucumber-pretty.svg

Custom Cucumber.js pretty formatter implementing event protocol for versions 3 to 6.

Official Cucumber.js pretty formatter implementing [message protocol](https://github.com/cucumber/common/tree/main/messages) for version 7 and later is at [@cucumber/pretty-formatter](https://www.npmjs.com/package/@cucumber/pretty-formatter).

- For Cucumber.js v1 and v2 use `-f pretty`
- For Cucumber.js v3, v4, and v5 install `cucumber-pretty@1.5` and use `-f node_modules/cucumber-pretty`
- For Cucumber.js v6 install `cucumber-pretty@6` and use `-f node_modules/cucumber-pretty`
- For Cucumber.js v7 install `@cucumber/pretty-formatter` and use `-f @cucumber/pretty-formatter`

Built with 🥒 by [Ilya Kozhevnikov](http://kozhevnikov.com/).

## Use

```bash
npm i cucumber-pretty
cucumber-js -f node_modules/cucumber-pretty
```

## References

- https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#formats
- https://github.com/cucumber/cucumber-js/blob/master/docs/custom_formatters.md

## Dark

<img src="https://raw.githubusercontent.com/kozhevnikov/cucumber-pretty/master/docs/homebrew.png" width="570">

## Light

<img src="https://raw.githubusercontent.com/kozhevnikov/cucumber-pretty/master/docs/basic.png" width="570">
