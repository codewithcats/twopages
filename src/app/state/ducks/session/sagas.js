import {call, all, take} from 'redux-saga/effects'

import types from './types'
import {types as routingTypes} from '../routing'
import router from '../../../router'

function* authStateChange() {
  yield all([
    take(types.AUTH_STATE_CHANGE),
    take(routingTypes.ROUTER_STARTED)
  ])
  yield call(router.navigate, 'dashboard')
}

export default [
  authStateChange
]
