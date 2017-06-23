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

export default {
  readCommit,
  recordsChange
}
