import {call, all, take, takeLatest, put} from 'redux-saga/effects'

import types from './types'
import actions from './actions'
import {types as routingTypes} from '../routing'
import router from '../../../router'
import sessionApi from '../../../api/session'

function* authStateChange() {
  yield all([
    take(types.AUTH_STATE_CHANGE),
    take(routingTypes.ROUTER_STARTED)
  ])
  yield call(router.navigate, 'dashboard')
}

function* register(action) {
  const {email, password} = action.payload
  try {
    yield call(sessionApi.register, email, password)
  } catch (error) {
    yield put(actions.registerError(error))
  }
}

function* watchRegister() {
  yield takeLatest(types.REGISTER, register)
}

export default [
  authStateChange,
  watchRegister
]
