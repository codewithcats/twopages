import types from './types'

const nodeChange = (node) => ({
  type: types.NODE_CHANGE,
  payload: {
    node
  }
})

const routeChange = (to, from) => ({
  type: types.ROUTE_CHANGE,
  payload: {
    to, from
  }
})

const navigate = (to, params, options) => ({
  type: types.NAVIGATE,
  payload: {
    to, params, options
  }
})

const started = () => ({
  type: types.ROUTER_STARTED
})

export default {
  nodeChange,
  routeChange,
  navigate,
  started
}

