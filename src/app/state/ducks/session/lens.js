import R from 'ramda'

const userLens = R.lensPath(['user'])
const registerErrorLens = R.lensPath(['registerError'])

export default {
  userLens,
  registerErrorLens
}
