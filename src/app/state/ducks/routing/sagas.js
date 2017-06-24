import {take, put, takeLatest, call} from 'redux-saga/effects'

import router from '../../../router'
import types from './types'
import {actions as recordActions} from '../record'

function* enterDashboard() {
  while (true) {
    const action = yield take(types.ROUTE_CHANGE)
    const {to} = action.payload
    if (to.name === 'dashboard') {
      yield put(recordActions.fetchRecords())
    }
  }
}

export function* navigate(action) {
  const {to, params, options} = action.payload
  yield call(router.navigate, to, params, options)
}

export function* watchNavigate() {
  yield takeLatest(types.NAVIGATE, navigate)
}

export default [
  enterDashboard,
  watchNavigate
]
