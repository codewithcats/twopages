import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Dashboard from './dashboard'
import {lens as routingLens} from '../../state/ducks/routing'

const Container = styled.section`
  flex: 1;
  display: flex;
  padding: 1rem;
`

const Content = (props) => {
  const {stateName, view} = props
  return (
    <Container>
      {view}
    </Container>
  )
}

function stateToProps(state) {
  const stateName = R.view(routingLens.currentStateNameLens, state.routing)
  switch (stateName) {
    case 'dashboard':
      return {state: stateName, view: <Dashboard />}
    default:
      return {state: stateName}
  }
}

const Content_connected = connect(stateToProps)(Content)

export default Content_connected
