# Cucumber.js Pretty Formatter

*Cucumber.js 3 pretty formatter based on event protocol*

# WORK IN PROGRESS

## Usage

```bash
npm install cucumber-pretty --save-dev
cucumber-js test --format node_modules/cucumber-pretty
```

## Options

Pretty format options can be passed via `pretty` property in addition to global options such as `colorsEnabled`.

```bash
--format-options '{ "pretty": { "summary": false } }'
```

| Name | Default | Description|
| --- | --- | --- |
| passed | false | Log passed status after step is finished |
| summary | true | Log summary after run is finished |

## References

- https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#formats
- https://github.com/cucumber/cucumber-js/blob/master/docs/custom_formatters.md
- https://docs.cucumber.io/event-protocol/
