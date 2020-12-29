# Contributing to cucumber-pretty

To build the project and run all the tests in one go, simply run:

    npm test

As a BDD practitioner, you'll probably need to run the tests often. They are run using [Mocha](https://mochajs.org/). The source of cucumber-pretty is written in [TypeScript](https://typescriptlang.org/) and needs to be compiled to JavaScript to run. To do so, run the build watch task in one terminal:

    npm run build:watch

All TypeScript sources found in `src/` and `test/` are now being built into `lib/`. That directory contains both the production code we release (`lib/src/`) as an NPM package and also all the tests (`lib/test/`). Run those tests with the following command:

    npm run test:mocha

When focussing on a single test, you can add the string `wip` to its description and run `npm run test:mocha:wip`. Keep in mind that the `build:watch` daemon needs to run in the background for your changes to be picked up after you save your changes.

You can also automatically rerun the tests on file changes:

    npm run test:mocha:wip:watch
