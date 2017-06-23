import {take} from 'redux-saga/effects'
import types from './types'

function* saveRecord() {
  while (true) {
    const action = yield take(types.READ_COMMIT)
    console.debug('saveRecord', action)
  }
}

export default [
  saveRecord
]
