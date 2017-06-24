import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

import {actions as sessionActions} from '../../../state/ducks/session'

const InfoContainer = styled.div`
  margin-bottom: 1rem;
`

const UserIcon = styled.i`
  margin-right: 1rem;
`

const UserDetail = (props) => {
  const {signOut, user} = props
  return (
    <div>
      <InfoContainer>
        <UserIcon className="fa fa-user-circle"></UserIcon>
        <span>{user.email}</span>
      </InfoContainer>
      <button className="button" onClick={signOut}>
        Sign Out
      </button>
    </div>
  )
}

const UserDetail_connected = connect(null, {
  signOut: sessionActions.signOut
})(UserDetail)

export default UserDetail_connected
