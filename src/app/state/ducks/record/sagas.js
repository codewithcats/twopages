import {take, call, put} from 'redux-saga/effects'
import types from './types'
import actions from './actions'
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
    yield put(actions.recordsChange(records))
  }
}

export default [
  saveRecord
]
