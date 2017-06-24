import types from './types'

const authStateChange = (user) => ({
  type: types.AUTH_STATE_CHANGE,
  payload: {
    user
  }
})

export default {
  authStateChange
}
