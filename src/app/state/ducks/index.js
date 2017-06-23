import routing from './routing'
import record from './record'

const reducers = Object.assign(
  {},
  routing.reducer
)

const sagas = [].concat(
  record.sagas
)

export default {
  reducers,
  sagas
}
