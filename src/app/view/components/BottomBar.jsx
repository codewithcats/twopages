import React from 'react'
import styled from 'styled-components'
import {rgba} from 'polished'
import {connect} from 'react-redux'
import {
  compose,
  withHandlers
} from 'recompose'

import {purple} from '../base/colors'
import {actions as routingActions} from '../../state/ducks/routing'

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  border-color: ${rgba(purple['500'], 0.14)};
  box-shadow: 0 -2px 4px 1px ${rgba(purple['500'], 0.06)};
`
const NavItem = styled.a`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding-top: 1rem;
`

const Icon = styled.span`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`

const BottomBar = (props) => {
  const {profile} = props
  return (
    <Container className="nav">
      <NavItem className="nav-item">
        <Icon className="icon">
          <i className="fa fa-home"></i>
        </Icon>
        <span>Home</span>
      </NavItem>
      <NavItem className="nav-item">
        <Icon className="icon">
          <i className="fa fa-book"></i>
        </Icon>
        <span>Library</span>
      </NavItem>
      <NavItem className="nav-item"
        onClick={profile}>
        <Icon className="icon">
          <i className="fa fa-user-circle"></i>
        </Icon>
        <span>User</span>
      </NavItem>
    </Container>
  )
}

const BottomBar_composed = compose(
  withHandlers({
    profile: ({navigate}) => () => {
      navigate('profile')
    }
  })
)(BottomBar)

const BottomBar_connected = connect(null, {
  navigate: routingActions.navigate
})(BottomBar_composed)

export default BottomBar_connected
