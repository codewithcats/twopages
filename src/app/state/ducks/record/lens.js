import R from 'ramda'

export const recordsLens = R.lensPath(['records'])
export const recordOrderLens = R.lensPath(['recordOrder'])
export const addBookToRecordPending = R.lensPath(['addBookToRecordPending'])

export default {
  recordsLens,
  recordOrderLens,
  addBookToRecordPending
}
