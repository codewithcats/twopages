import types from './types'

const readCommit = (date) => ({
  type: types.READ_COMMIT,
  payload: {
    date
  }
})

export default {
  readCommit
}
