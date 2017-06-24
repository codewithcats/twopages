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

const registerError = (error) => ({
  type: types.REGISTER_ERROR,
  error: true,
  payload: {
    error
  }
})

const clearRegistrationError = () => ({
  type: types.CLEAR_REGISTER_ERROR
})

export default {
  authStateChange,
  register,
  registerError,
  clearRegistrationError
}
