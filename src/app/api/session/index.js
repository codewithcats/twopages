import {auth} from 'firebase'

export async function register(email, password) {
  return auth().createUserWithEmailAndPassword(email, password)
}

export default {
  register
}
