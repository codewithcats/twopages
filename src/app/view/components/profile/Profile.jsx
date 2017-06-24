import React from 'react'
import styled from 'styled-components'

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; 
`

const Or = styled.h4`
  margin: 0 1rem !important;
`

const UnlockTitle = styled.h5`
  text-align: center;
  margin-top: 2rem;
`

const Profile = () => {
  return (
    <section>
      <ActionContainer>
        <button className="button is-medium is-primary">Register</button>
        <Or className="title is-4">or</Or> 
        <button className="button is-medium is-primary">Sign In</button>
      </ActionContainer>
      <UnlockTitle className="title is-5">
        To Unlock Full Features
      </UnlockTitle>
      <div>
        
      </div>
    </section>
  )
}

export default Profile
