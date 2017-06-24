import {call, all, take, takeLatest} from 'redux-saga/effects'

import types from './types'
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
  yield call(sessionApi.register, email, password)
}

function* watchRegister() {
  yield takeLatest(types.REGISTER, register)
}

export default [
  authStateChange,
  watchRegister
]
