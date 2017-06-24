import React from 'react'
import styled from 'styled-components'

import {purple} from './colors'

export const LabelIcon = styled.i`
  font-size: 0.5rem;
  color: ${purple['300']}
`

export const Asterisk = () => <LabelIcon className="fa fa-asterisk" />
