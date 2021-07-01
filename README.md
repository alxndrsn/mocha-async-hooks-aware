mocha-async-hooks-aware
=======================

Extension for [mocha javascript testing library](https://mochajs.org/) to prevent async context leakage between tests.

# Use

In your mocha setup:

	require('mocha-async-hooks-aware');

It might also be possible to add `--require mocha-async-hooks-aware` to your mocha call.

# Development

## Setup

	yarn

## Running tests

	yarn test

## Demonstrating why this lib is necessary

	yarn test:no-protection

# Further reading

* `AsyncLocalStorage`: https://nodejs.org/api/async_context.html#async_context_class_asynclocalstorage
* why/when this lib is useful: https://github.com/mochajs/mocha/issues/4662
