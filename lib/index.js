/**
 * Modules
 */

var observable = require('@f/observable')
var isObject = require('@f/is-object')
var isUndefined = require('@f/is-undefined')
var isFunction = require('@f/is-function')

/**
 * Action
 */

var INIT = '@f/store/INIT'

/**
 * Expose Store
 */

module.exports = store

/**
 * Expose INIT action
 */

store.INIT = INIT

/**
 * An observable store
 * @param  {Function} initialReducer
 * @param  {Object} initialState
 * @return {Object} store
 */

function store (initialReducer, initialState) {
  if (!isFunction(initialReducer)) {
    throw new Error('Expected the initialReducer to be a function.')
  }

  var reducer = initialReducer
  var state = initialState || {}
  var isDispatching = false
  var o = observable()

  dispatch({type: INIT})

  return {
    getState: getState,
    dispatch: dispatch,
    subscribe: o.subscribe,
    replaceReducer: replaceReducer
  }

  function getState () {
    return state
  }

  function dispatch (action) {
    if (!isObject(action)) {
      throw new Error('Actions must be plain objects. ')
    }

    if (isUndefined(action.type)) {
      throw new Error('Actions may not have an undefined "type" property. ')
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      isDispatching = true
      state = reducer(state, action)
    } finally {
      isDispatching = false
    }

    o.next(state)
  }

  function replaceReducer (nextReducer) {
    if (!isFunction(nextReducer)) {
      throw new Error('Expected the nextReducer to be a function.')
    }
    reducer = nextReducer
    dispatch({type: INIT})
  }
}
