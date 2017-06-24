import R from 'ramda'

const userLens = R.lensPath(['user'])
const registerErrorLens = R.lensPath(['registerError'])
const signInErrorLens = R.lensPath(['signInError'])

export default {
  userLens,
  registerErrorLens,
  signInErrorLens
}
