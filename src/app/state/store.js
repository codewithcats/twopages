import {createStore, applyMiddleware, combineReducers} from 'redux'
import {createLogger} from 'redux-logger'
import router from '../router'
import ducks from './ducks'
import {actions as routingActions} from './ducks/routing'
import createSagaMiddleware from 'redux-saga'
import {all, fork} from 'redux-saga/effects'

function* rootSaga() {
  yield all(ducks.sagas.map(saga => fork(saga)))
}

function configStore(initialState) {
  const reducers = combineReducers(ducks.reducers)

  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }

  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middlewares)
  )

  sagaMiddleware.run(rootSaga)

  router.addNodeListener('', () => {
    const action = routingActions.nodeChange('')
    store.dispatch(action)
  })

  router.addListener((to, from) => {
    const action = routingActions.routeChange(to, from)
    store.dispatch(action)
  })

  return store
}

export default configStore({})
