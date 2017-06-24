import React from 'react'
import styled from 'styled-components'
import {rgba} from 'polished'

import {purple} from '../base/colors'

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

const BottomBar = () => {
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
      <NavItem className="nav-item">
        <Icon className="icon">
          <i className="fa fa-user-circle"></i>
        </Icon>
        <span>User</span>
      </NavItem>
    </Container>
  )
}

export default BottomBar
