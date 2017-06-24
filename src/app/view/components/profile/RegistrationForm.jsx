import React from 'react'
import styled from 'styled-components'

import {purple} from '../../base/colors'

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end; 
`

const Or = styled.h4`
  margin: 0 1rem !important;
`

const UnlockTitle = styled.p`
  margin-top: 0.5rem;
  font-size: 1.25rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const UnlockIcon = styled.i`
  margin-right: 0.5rem;
  color: ${purple['300']}
`

const RegistrationForm = () => {
  return (
    <form>
      <div className="field">
        <p className="control">
          <label className="label">Email</label>
          <input type="text" className="input"/>
        </p>
      </div>
      <div className="field">
        <p className="control">
          <label className="label">Password</label>
          <input type="password" className="input"/>
        </p>
      </div>
      <ActionContainer className="field">
        <button className="button is-medium is-primary">Register</button>
        <Or className="title is-4">or</Or> 
        <button className="button is-medium is-primary">Sign In</button>
      </ActionContainer>
      <UnlockTitle>
        <UnlockIcon className="fa fa-unlock-alt"></UnlockIcon>
        To Unlock Full Features
      </UnlockTitle>
    </form>
  )
}

export default RegistrationForm
