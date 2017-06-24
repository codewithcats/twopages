import R from 'ramda'
import {take, takeLatest, call, put, select} from 'redux-saga/effects'
import types from './types'
import actions from './actions'
import {
  saveRecordToLocal,
  fetchRecordsFromLocal,
  saveBookToLocal,
  fetchRecords as fetchRecordsFromRemote,
  updateRecords,
  updateBooks
} from '../../../api/record'
import {lens as sessionLens} from '../session'

function* saveRecord() {
  while (true) {
    const action = yield take(types.READ_COMMIT)
    const recordDate = action.payload.date
    const record = {
      date: recordDate.format('YYYY-MM-DD'),
      read: true
    }
    const user = yield select(state => R.view(sessionLens.userLens, state.session))
    if (user) {
      const records = {[record.date]: record}
      yield call(updateRecords, user, records)
      const remoteRecords = yield call(fetchRecordsFromRemote, user)
      yield put(actions.recordsChange(remoteRecords))
    } else {
      const records = yield call(saveRecordToLocal, record)
      yield put(actions.recordsChange(records))
    }
  }
}

function* fetchRecords(action) {
  const user = yield select(state => R.view(sessionLens.userLens, state.session))
  if (user) {
    const remoteRecords = yield call(fetchRecordsFromRemote, user)
    console.debug('fetchRecords', remoteRecords)
    yield put(actions.recordsChange(remoteRecords))
  } else {
    const records = yield call(fetchRecordsFromLocal)
    yield put(actions.recordsChange(records))
  }
}

function* watchFetchRecords() {
  yield takeLatest(types.FETCH_RECORDS, fetchRecords)
}

function* addBookToRecord() {
  while (true) {
    const {payload: {record, book, pages}} = yield take(types.ADD_BOOK_TO_RECORD)
    const user = yield select(state => R.view(sessionLens.userLens, state.session))
    if (user) {
      const books = {[book.title]: book}
      yield call(updateBooks, books)
      const newRecord = R.merge(record, {
        books: R.append({title: book.title, pages}, record.books || [])
      })
      const records = {[newRecord.date]: newRecord}
      yield call(updateRecords, user, records)
      const remoteRecords = yield call(fetchRecordsFromRemote, user)
      yield put(actions.recordsChange(remoteRecords))
    } else {
      yield call(saveBookToLocal, book)
      const newRecord = R.merge(record, {
        books: R.append({title: book.title, pages}, record.books || [])
      })
      const records = yield call(saveRecordToLocal, newRecord)
      yield put(actions.recordsChange(records))
    }
  }
}

export default [
  saveRecord,
  watchFetchRecords,
  addBookToRecord
]
