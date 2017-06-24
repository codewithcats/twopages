import React from 'react'
import {connect} from 'react-redux'
import {
  compose,
  withProps,
  withHandlers
} from 'recompose'
import moment from 'moment'
import styled from 'styled-components'
import R from 'ramda'

import {
  actions as recordActions,
  lens as recordLens
} from '../../../state/ducks/record'

import Progress from './Progress'
import TodayPanel from './TodayPanel'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: stretch;
`

const ProgressContainer = styled.div`
  margin-top: 2rem
`

const Dashboard = (props) => {
  const {todayStr, onReadCommit, isCommitted, todayRecord} = props
  return (
    <Container>
      <TodayPanel todayStr={todayStr}
        todayRecord={todayRecord}
        onReadCommit={onReadCommit}
        isCommitted={isCommitted} />
      <ProgressContainer>
        <Progress />
      </ProgressContainer>
    </Container>
  )
}

const Dashboard_composed = compose(
  withProps(({readRecords = {}}) => {
    const today = moment()
    const todayKey = today.format('YYYY-MM-DD')
    const todayRecord = readRecords[todayKey]
    return {
      date: today,
      todayStr: today.format('Do MMMM YYYY'),
      isCommitted: !!todayRecord,
      todayRecord
    }
  }),
  withHandlers({
    onReadCommit: ({date, readCommit}) => (event) => {
      readCommit(date)
    }
  })
)(Dashboard)

function stateToProps(state) {
  const records = R.view(recordLens.recordsLens, state.record)
  return {
    readRecords: records
  }
}

const Dashboard_connected = connect(stateToProps, {
  readCommit: recordActions.readCommit
})(Dashboard_composed)

export default Dashboard_connected
