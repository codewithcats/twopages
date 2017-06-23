import R from 'ramda'

export const recordsLens = R.lensPath(['records'])
export const recordOrderLens = R.lensPath(['recordOrder'])

export default {
  recordsLens,
  recordOrderLens
}
