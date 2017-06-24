import {take, takeLatest, call, put} from 'redux-saga/effects'
import types from './types'
import actions from './actions'
import {
  saveRecordToLocal,
  fetchRecordsFromLocal,
  saveBookToLocal
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

function* addBookToRecord() {
  while (true) {
    const {payload: {record, book, pages}} = yield take(types.ADD_BOOK_TO_RECORD)
    const savedBook = yield call(saveBookToLocal, book)
    console.debug('addBookToRecord:book', savedBook)
  }
}

export default [
  saveRecord,
  watchFetchRecords,
  addBookToRecord
]
