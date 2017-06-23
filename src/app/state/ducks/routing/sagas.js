import {take, put} from 'redux-saga/effects'

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

export default [
  enterDashboard
]
