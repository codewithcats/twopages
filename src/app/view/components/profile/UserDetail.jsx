import React from 'react'
import {connect} from 'react-redux'

import {actions as sessionActions} from '../../../state/ducks/session'

const UserDetail = (props) => {
  const {signOut} = props
  return (
    <div>
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
