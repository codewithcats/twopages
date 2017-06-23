import {createStore, applyMiddleware, combineReducers} from 'redux'
import {createLogger} from 'redux-logger'
import router from '../router'
import {actions as routingActions} from './ducks/routing'

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
