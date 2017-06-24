import React from 'react'
import styled from 'styled-components'

import RecordDetailForm from './RecordDetailForm'

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
        <i className="fa fa-calendar-check-o"></i> {todayStr}
      </TodayTitle>
      {!isCommitted && (
        <div>
          <p>
            You have read at least 2 pages today?
          </p>
          <ReadButton className="button is-large is-primary"
            onClick={onReadCommit} disabled={isCommitted}>
            Yes!
          </ReadButton>
        </div>
      )}
      {isCommitted && (
        <div>
          <p>
            Good job! You already read at least 2 pages today.
          </p>
          <RecordDetailForm />
        </div>
      )}
    </div>
  )
}

export default TodayPanel
