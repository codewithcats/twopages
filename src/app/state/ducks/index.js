import routing from './routing'
import record from './record'
import session from './session'

const reducers = Object.assign(
  {},
  routing.reducer,
  record.reducer
)

const sagas = [].concat(
  record.sagas,
  routing.sagas,
  session.sagas
)

export default {
  reducers,
  sagas
}
