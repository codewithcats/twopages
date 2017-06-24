import types from './types'

const authStateChange = (user) => ({
  type: types.AUTH_STATE_CHANGE,
  payload: {
    user
  }
})

const register = (email, password) => ({
  type: types.REGISTER,
  payload: {
    email, password
  }
})

export default {
  authStateChange,
  register
}
