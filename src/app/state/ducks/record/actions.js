import types from './types'

const readCommit = (date) => ({
  type: types.READ_COMMIT,
  payload: {
    date
  }
})

const recordsChange = (records) => ({
  type: types.RECORDS_CHANGE,
  payload: {
    records
  }
})

const fetchRecords = () => ({
  type: types.FETCH_RECORDS
})

const updateRecord = (record) => ({
  type: types.UPDATE_RECORD,
  payload: {
    record
  }
})

const addBookToRecord = (record, book, pages) => ({
  type: types.ADD_BOOK_TO_RECORD,
  payload: {
    record,
    book,
    pages
  }
})

const addBookToRecordPending = () => ({
  type: types.ADD_BOOK_TO_RECORD_PENDING
})

const addBookToRecordDone = () => ({
  type: types.ADD_BOOK_TO_RECORD_DONE
})

export default {
  readCommit,
  recordsChange,
  fetchRecords,
  updateRecord,
  addBookToRecord,
  addBookToRecordPending,
  addBookToRecordDone
}
