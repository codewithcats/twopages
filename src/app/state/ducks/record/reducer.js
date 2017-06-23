import R from 'ramda'

import types from './types'
import lens from './lens'

const recordsChangeReducer = (state, action) => {
  const {records} = action.payload
  const recordOrder = R.pipe(
    R.keys,
    R.sort((a, b) => a < b)
  )(records)
  return R.pipe(
    R.set(lens.recordsLens, records),
    R.set(lens.recordOrderLens, recordOrder)
  )(state)
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.RECORDS_CHANGE:
      return recordsChangeReducer(state, action)

    default: return state
  }
}

export default {
  record: reducer
}
