mocha-async-hooks-aware
=======================

[![build status](https://github.com/alxndrsn/mocha-async-hooks-aware/actions/workflows/test.yml/badge.svg)](https://github.com/alxndrsn/mocha-async-hooks-aware/actions)

Extension for [mocha javascript testing library](https://mochajs.org/) to prevent async context leakage between tests.

# Use

Add the dependency, e.g.:

	yarn add -D mocha-async-hooks-aware

Add the following to your mocha config:

	--require mocha-async-hooks-aware

For more info, see https://mochajs.org/#-require-module-r-module

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
