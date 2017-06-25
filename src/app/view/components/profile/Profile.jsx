import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'
import styled from 'styled-components'

import {lens as sessionLens} from '../../../state/ducks/session'

import RegistrationForm from './RegistrationForm'
import UserDetail from './UserDetail'

const Container = styled.section`
  padding-bottom: 5rem;
`

const Profile = (props) => {
  const {user} = props
  return (
    <Container>
      {user? <UserDetail user={user} />: <RegistrationForm />}
    </Container>
  )
}

function stateToProps(state) {
  const user = R.view(sessionLens.userLens, state.session)
  return {
    user
  }
}

const Profile_connected = connect(stateToProps)(Profile)

export default Profile_connected
