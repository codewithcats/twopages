import R from 'ramda'

export const currentStateLens = R.lensPath(['currentState'])
export const currentStateNameLens = R.lensPath(['currentState', 'name'])

export default {
  currentStateLens,
  currentStateNameLens
}
