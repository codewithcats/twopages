import R from 'ramda'

import types from './types'
import lens from './lens'

const recordsChangeReducer = (state, action) => {
  const {records} = action.payload
  return R.set(lens.recordsLens, records, state)
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
