import React from 'react'
import styled from 'styled-components'
import {rgba} from 'polished'
import {purple} from '../base/colors'

const Container = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-color: ${rgba(purple['500'], 0.14)};
  padding: 1rem;
  box-shadow: 0 2px 4px -1px ${rgba(purple['500'], 0.06)}, 0 4px 5px 0 ${rgba(purple['500'], 0.06)}, 0 1px 10px 0 ${rgba(purple['500'], 0.08)};
`

const Title = styled.h1`
  color: ${purple['500']};
`

const Header = () => {

  return (
    <Container>
      <Title className="title is-3">
        twopages
      </Title>
    </Container>
  )
}

export default Header
