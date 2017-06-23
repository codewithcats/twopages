import {take, call} from 'redux-saga/effects'
import types from './types'
import {saveRecordToLocal} from '../../../api/record'

function* saveRecord() {
  while (true) {
    const action = yield take(types.READ_COMMIT)
    const recordDate = action.payload.date
    const record = {
      date: recordDate.format('YYYY-MM-DD'),
      read: true
    }
    const records = yield call(saveRecordToLocal, record)
    console.debug('New Records', records)
  }
}

export default [
  saveRecord
]
