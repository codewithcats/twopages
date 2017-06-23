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

export default {
  readCommit,
  recordsChange,
  fetchRecords
}
