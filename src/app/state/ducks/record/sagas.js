import R from 'ramda'
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
    const savedBooks = yield call(saveBookToLocal, book)
    const newRecord = R.merge(record, {
      books: R.append(book.title, record.books || []),
      pages
    })
    const records = yield call(saveRecordToLocal, newRecord)
    yield put(actions.recordsChange(records))
  }
}

export default [
  saveRecord,
  watchFetchRecords,
  addBookToRecord
]
