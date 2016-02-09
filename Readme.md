
# store

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

An observable store.

## Installation

    $ npm install @f/store

## Usage

```js
var createStore = require('@f/store')
var combineReducers = require('@f/combine-reducers')
var store = createStore(combineReducers({foo: foo, bar: bar}))

store.dispatch({type: 'foo'})
store.getState() // => {foo: 1, bar: 0}

function foo (state, action) {
  state = state || 0
  return action.type === 'foo' ? 1 : state
}

function bar (state, action) {
  state = state || 0
  return action.type === 'bar' ? 2 : state
}

```

## API

### store(reducer, state)

- `reducer` - store reducer
- `state` - initial state of store

**Returns:** a store

### .getState()

**Returns:** current state of the store

### .dispatch(action)

- `action` - action to dispatch

### subscribe(listener)

- `listener` - listener to call on store updates - signature `listener(state)`

### replaceReducer(reducer)

- `reducer` - the reducer to use in place of the current reducer

## License

MIT

[travis-image]: https://img.shields.io/travis/micro-js/store.svg?style=flat-square
[travis-url]: https://travis-ci.org/micro-js/store
[git-image]: https://img.shields.io/github/tag/micro-js/store.svg
[git-url]: https://github.com/micro-js/store
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@f/store.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@f/store
