import {take, takeLatest, call, put} from 'redux-saga/effects'
import types from './types'
import actions from './actions'
import {
  saveRecordToLocal,
  fetchRecordsFromLocal
} from '../../../api/record'

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

function* fetchRecords(action) {
  const records = yield call(fetchRecordsFromLocal)
  yield put(actions.recordsChange(records))
}

function* watchFetchRecords() {
  yield takeLatest(types.FETCH_RECORDS, fetchRecords)
}

export default [
  saveRecord,
  watchFetchRecords
]
