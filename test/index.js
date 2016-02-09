/**
 * Imports
 */

var store = require('..')
var test = require('tape')
var identity = require('@f/identity')
var combineReducer = require('@f/combine-reducers')

/**
 * Tests
 */

test('exposes api', function (t) {
  var s = store(identity)
  t.ok(s.getState)
  t.ok(s.dispatch)
  t.ok(s.subscribe)
  t.ok(s.replaceReducer)
  t.end()
})

test('should throw if reducer is not a functions', function (t) {
  t.throws(function () {
    store({})
  })
  t.end()
})

test('passes initial state', function (t) {
  var i = {foo: 'bar'}
  var s = store(identity, i)
  t.equal(s.getState(), i)
  t.end()
})

test('applies reducer to previous state', function (t) {
  var s = store(add, [])
  t.deepEqual(s.getState(), [])
  s.dispatch({type: 'add', payload: 'hello world'})
  t.deepEqual(s.getState(), ['hello world'])
  t.end()
})

test('applies reducer to initial state', function (t) {
  var s = store(init, [])
  t.deepEqual(s.getState(), ['hello world'])
  t.end()
})

test('passes next state to subscribes', function (t) {
  var s = store(add, [])
  s.subscribe(function (state) {
    t.deepEqual(state, ['hello world'])
    t.end()
  })
  s.dispatch({type: 'add', payload: 'hello world'})
})

test('only accepts object actions', function (t) {
  var s = store(identity)
  s.dispatch({type: 'woot'})
  t.throws(function () {
    s.dispatch(undefiend)
  })
  t.end()
})

test('handles nested dispatch', function (t) {
  var s = store(combineReducer({foo: foo, bar: bar}))

  s.subscribe(function (state) {
    if (!state.bar) {
      s.dispatch({type: 'bar'})
    }
  })
  s.dispatch({type: 'foo'})
  t.deepEqual(s.getState(), {foo: 1, bar: 2})
  t.end()

  function foo (state, action) {
    state = state || 0
    return action.type === 'foo' ? 1 : state
  }

  function bar (state, action) {
    state = state || 0
    return action.type === 'bar' ? 2: state
  }
})

test('does not allow dispatch in reducer', function (t) {
  var s = store(dispatch)

  t.throws(function () {
    s.dispatch({type: 'woot'})
  })
  t.end()

  function dispatch (state, action) {
    if (action.type === 'woot') s.dispatch({type: 'bar'})
    return state
  }
})

test('throws if action type not specified', function (t) {
  var s = store(identity)
  t.throws(function () {
    s.dispatch()
  })
  t.throws(function () {
    s.dispatch({type: undefined})
  })
  t.throws(function () {
    s.dispatch({})
  })
  s.dispatch({type: false})
  t.end()
})

function init (state, action) {
  if (action.type === store.INIT) {
    state = [].concat(state).concat('hello world')
  }
  return state
}

function add (state, action) {
  if (action.type === 'add') {
    state = [].concat(state).concat(action.payload)
  }
  return state
}
