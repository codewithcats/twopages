import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'

import {lens as sessionLens} from '../../../state/ducks/session'

import RegistrationForm from './RegistrationForm'
import UserDetail from './UserDetail'


const Profile = (props) => {
  const {user} = props
  return (
    <section>
      {user? <UserDetail user={user} />: <RegistrationForm />}
    </section>
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
