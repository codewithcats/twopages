import {createStore, applyMiddleware, combineReducers} from 'redux'
import {createLogger} from 'redux-logger'
import router from '../router'

function configStore(initialState) {
  const middlewares = []
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }

  const store = createStore(
    s => s,
    initialState,
    applyMiddleware(...middlewares)
  )

  return store
}

export default configStore({})
