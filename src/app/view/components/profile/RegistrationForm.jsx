import React from 'react'
import R from 'ramda'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {
  compose,
  withProps,
  withState,
  withHandlers
} from 'recompose'

import {purple} from '../../base/colors'
import {Asterisk} from '../../base/form'
import {
  actions as sessionActions,
  lens as sessionLens 
} from '../../../state/ducks/session'

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

const RegistrationForm = (props) => {
  const {isFormValid, email, password, registerError, signInError,
    onEmailChange, onPasswordChange, onSubmit, onCloseRegErrorClick, onSignInClick, onCloseSignInErrorClick} = props
  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <p className="control">
          <label className="label">Email <Asterisk /></label>
          <input type="email" className="input"
            value={email} onChange={onEmailChange}/>
        </p>
      </div>
      <div className="field">
        <p className="control">
          <label className="label">Password <Asterisk /></label>
          <input type="password" className="input"
            value={password} onChange={onPasswordChange}/>
        </p>
      </div>
      <ActionContainer className="field">
        <button className="button is-medium is-primary" disabled={!isFormValid}>
          Register
        </button>
        <Or className="title is-4">or</Or> 
        <button className="button is-medium is-primary" disabled={!isFormValid}
          onClick={onSignInClick}>
          Sign In
        </button>
      </ActionContainer>
      <UnlockTitle>
        <UnlockIcon className="fa fa-unlock-alt"></UnlockIcon>
        To Unlock Full Features
      </UnlockTitle>
      {registerError && (
        <div className="notification is-warning">
          <button className="delete" onClick={onCloseRegErrorClick}></button>
          Registration failed. Please check your email and password.
          Already registered? Please use sign in button instead ;-)
        </div>
      )}
      {signInError && (
        <div className="notification is-warning">
          <button className="delete" onClick={onCloseSignInErrorClick}></button>
          Sign in failed. Please check your email and password.
          Not have an account yet? Please use register button instead ;-)
        </div>
      )}
    </form>
  )
}

const RegistrationForm_composed = compose(
  withState('email', 'setEmail', ''),
  withState('password', 'setPassword', ''),
  withProps(({email, password}) => ({
    isFormValid: email && password
  })),
  withHandlers({
    onEmailChange: ({setEmail}) => (event) => {
      setEmail(event.target.value)
    },
    onPasswordChange: ({setPassword}) => (event) => {
      setPassword(event.target.value)
    },
    onSubmit: ({email, password, register}) => (event) => {
      event.preventDefault()
      register(email, password)   
    },
    onCloseRegErrorClick: ({clearRegistrationError}) => (event) => {
      clearRegistrationError()
    },
    onCloseSignInErrorClick: ({clearSignInError}) => (event) => {
      clearSignInError()
    },
    onSignInClick: ({email, password, signIn}) => event => {
      event.preventDefault()
      signIn(email, password)
    }
  })
)(RegistrationForm)

function stateToProps(state) {
  const registerError = R.view(sessionLens.registerErrorLens, state.session)
  const signInError = R.view(sessionLens.signInErrorLens, state.session)
  return {
    registerError,
    signInError
  }
}

const RegistrationForm_connected = connect(stateToProps, {
  register: sessionActions.register,
  clearRegistrationError: sessionActions.clearRegistrationError,
  signIn: sessionActions.signIn,
  clearSignInError: sessionActions.clearSignInError
})(RegistrationForm_composed)

export default RegistrationForm_connected
