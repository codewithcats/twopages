import {auth} from 'firebase'

export async function register(email, password) {
  return auth().createUserWithEmailAndPassword(email, password)
}

export async function signOut() {
  return auth().signOut()
}

export async function signIn(email, password) {
  return auth().signInWithEmailAndPassword(email, password)
}

export default {
  register,
  signOut,
  signIn
}
