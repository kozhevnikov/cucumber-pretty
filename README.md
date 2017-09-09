# Cucumber.js Pretty Formatter

*Cucumber.js 3 pretty formatter implementing event protocol*

## Usage

```bash
npm install cucumber-pretty --save-dev
cucumber-js test --format node_modules/cucumber-pretty
```

## Options

Format options can be passed via `pretty` property in addition to global options such as `colorsEnabled`.

```bash
--format-options '{ "pretty": { "summary": false } }'
```

| Name | Default | Description |
| --- | --- | --- |
| passed | false | Log passed status after step is finished |
| summary | true | Log summary after run is finished |

## References

- https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#formats
- https://github.com/cucumber/cucumber-js/blob/master/docs/custom_formatters.md
- https://docs.cucumber.io/event-protocol/

## TODO

- [x] Log Feature (v0.0.5)
- [x] Log @tags (v0.0.5)
- [ ] Log descriptions
- [ ] Log data tables
- [ ] Log doc strings
- [ ] Support translations
- [x] Colour Gherkin keywords (v0.0.4)
