import R from 'ramda'

import types from './types'
import lens from './lens'

const authStateChangeReducer = (state, action) => {
  const {user} = action.payload
  return R.set(lens.userLens, user, state)
}

const registerErrorReducer = (state, action) => {
  const {error} = action.payload
  return R.set(lens.registerErrorLens, error, state)
}

const clearRegisterErrorReducer = (state, action) => {
  return R.set(lens.registerErrorLens, null, state)
}

const signInErrorReducer = (state, action) => {
  const {error} = action.payload
  return R.set(lens.signInErrorLens, error, state)
}

const clearSignInErrorReducer = (state, action) => {
  return R.set(lens.signInErrorLens, null, state)
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.AUTH_STATE_CHANGE:
      return authStateChangeReducer(state, action)
    case types.REGISTER_ERROR:
      return registerErrorReducer(state, action)
    case types.CLEAR_REGISTER_ERROR:
      return clearRegisterErrorReducer(state, action)
    case types.SIGN_IN_ERROR:
      return signInErrorReducer(state, action)
    case types.CLEAR_SIGN_IN_ERROR:
      return clearSignInErrorReducer(state, action)

    default: return state
  }
}

export default {
  session: reducer
}