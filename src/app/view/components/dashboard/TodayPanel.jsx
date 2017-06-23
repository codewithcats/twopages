import React from 'react'
import styled from 'styled-components'

const TodayTitle = styled.h4`
  margin-bottom: 0.5rem !important;
`

const ReadButton = styled.button`
  font-size: 1.2rem !important;
  display: block;
`

const TodayPanel = (props) => {
  const {todayStr, onReadCommit, isCommitted} = props
  return (
    <div>
      <TodayTitle className="title is-4">
        <i className="fa fa-bookmark-o"></i> {todayStr}
      </TodayTitle>
      <ReadButton className="button is-large is-primary"
        onClick={onReadCommit} disabled={isCommitted}>
        I Read At Least 2 Pages Today!
      </ReadButton>
    </div>
  )
}

export default TodayPanel
