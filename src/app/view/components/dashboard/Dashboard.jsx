import React from 'react'
import {connect} from 'react-redux'
import {
  compose,
  withProps,
  withHandlers
} from 'recompose'
import moment from 'moment'
import styled from 'styled-components'
import {actions as recordActions} from '../../../state/ducks/record'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

const TodayTitle = styled.h4`
  margin-bottom: 0.5rem !important;
`

const ReadButton = styled.button`
  font-size: 1.2rem !important;
  display: block;
`

const Dashboard = (props) => {
  const {todayStr, onReadCommit} = props
  return (
    <Container>
      <TodayTitle className="title is-4">
        <i className="fa fa-bookmark-o"></i> {todayStr}
      </TodayTitle>
      <ReadButton className="button is-large is-primary"
        onClick={onReadCommit}>
        I Read At Least 2 Pages Today!
      </ReadButton>
    </Container>
  )
}

const Dashboard_composed = compose(
  withProps(() => ({
    date: moment(),
    todayStr: moment().format('Do MMMM YYYY')
  })),
  withHandlers({
    onReadCommit: ({date, readCommit}) => (event) => {
      readCommit(date)
    }
  })
)(Dashboard)

const Dashboard_connected = connect(null, {
  readCommit: recordActions.readCommit
})(Dashboard_composed)

export default Dashboard_connected
