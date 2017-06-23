import React from 'react'
import {
  compose,
  withProps
} from 'recompose'
import moment from 'moment'
import styled from 'styled-components'

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
  const {todayStr} = props
  return (
    <Container>
      <TodayTitle className="title is-4">
        <i className="fa fa-bookmark-o"></i> {todayStr}
      </TodayTitle>
      <ReadButton className="button is-large is-primary">
        I Read At Least 2 Pages Today!
      </ReadButton>
    </Container>
  )
}

const Dashboard_composed = compose(
  withProps(() => ({
    todayStr: moment().format('Do MMMM YYYY')
  }))
)(Dashboard)

export default Dashboard_composed
