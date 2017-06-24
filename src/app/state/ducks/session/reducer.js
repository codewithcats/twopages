import R from 'ramda'

import types from './types'
import lens from './lens'

const authStateChangeReducer = (state, action) => {
  const {user} = action.payload
  return R.set(lens.userLens, user, state)
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.AUTH_STATE_CHANGE:
      return authStateChangeReducer(state, action)

    default: return state
  }
}

export default {
  session: reducer
}