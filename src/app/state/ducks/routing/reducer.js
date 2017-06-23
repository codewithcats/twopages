import types from './types'
import {currentStateLens} from './lens'
import R from 'ramda'

const routeChangeReducer = (state, action) => {
  const {to} = action.payload
  return R.set(currentStateLens, to, state)
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.ROUTE_CHANGE:
      return routeChangeReducer(state, action)

    default: return state
  }
}

export default {
  routing: reducer
}