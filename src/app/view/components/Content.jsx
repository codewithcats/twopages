import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Dashboard from './dashboard'

const Container = styled.section`
  flex: 1;
  display: flex;
`

const Content = () => {
  return (
    <Container>
      A Content is here!
    </Container>
  )
}

const Content_connected = connect(null)(Content)

export default Content_connected
