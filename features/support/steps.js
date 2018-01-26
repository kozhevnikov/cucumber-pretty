/* eslint-disable no-unused-vars */
const { defineStep } = require('cucumber');

defineStep('noop', () => {});

defineStep('noop {string}', (noop) => {});

defineStep('ambiguous', () => {});
defineStep('ambiguous', () => {});

defineStep('failed', () => { throw new Error('FAILED'); });

defineStep('passed', () => {});

defineStep('pending', () => 'pending');

defineStep('skipped', () => 'skipped');

defineStep('doc string', (noop) => {});

defineStep('data table', (noop) => {});
