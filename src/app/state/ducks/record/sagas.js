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
  updateBooks,
  removeBookFromLocalRecord
} from '../../../api/record'
import {lens as sessionLens} from '../session'
import router from '../../../router'

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
    yield put(actions.addBookToRecordPending())

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
    yield put(actions.addBookToRecordDone())
  }
}

function* toEditRecord() {
  while (true) {
    const action = yield take(types.TO_EDIT_RECORD)
    const {record} = action.payload
    yield call(router.navigate, 'record.edit', {record: record.date})
  }
}

function* removeBookFromRecord() {
  while (true) {
    const {payload: {record, book}} = yield take(types.REMOVE_BOOK_FROM_RECORD)
    console.debug('removeBookFromLocalRecord', record, book)
    const user = yield select(state => R.view(sessionLens.userLens, state.session))
    if (user) {

    } else {
      const records = yield call(removeBookFromLocalRecord, record, book)
      yield put(actions.recordsChange(records))
    }
  }
}

export default [
  saveRecord,
  watchFetchRecords,
  addBookToRecord,
  toEditRecord,
  removeBookFromRecord
]
