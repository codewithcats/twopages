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

import TodayPanel from './TodayPanel'
import {PageContainer} from '../../base/container'
import {EditBookRecordForm} from '../editRecord'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: stretch;
`

const ReadingListContainer = styled.div`
  margin-top: 2rem
`

const Dashboard = (props) => {
  const {todayStr, onReadCommit, isCommitted, todayRecord, books,
    removeBook, updateBook} = props
  return (
    <PageContainer>
      <Container>
        <TodayPanel todayStr={todayStr}
          todayRecord={todayRecord}
          onReadCommit={onReadCommit}
          isCommitted={isCommitted} />
        <ReadingListContainer>
          {!!books.length && (
            <h5 className="title is-5">
              Today Reading
            </h5>
          )}
          {books.map(book => (
            <EditBookRecordForm record={todayRecord}
              key={book.title}
              book={book} 
              removeBook={removeBook}
              updateBook={updateBook} />
          ))}
        </ReadingListContainer>
      </Container>
    </PageContainer>
  )
}

const Dashboard_composed = compose(
  withProps(({readRecords}) => {
    const today = moment()
    const todayKey = today.format('YYYY-MM-DD')
    const todayRecord = readRecords[todayKey]
    const books = R.pathOr([], ['books'], todayRecord)
    return {
      date: today,
      todayStr: today.format('Do MMMM YYYY'),
      isCommitted: !!todayRecord,
      todayRecord,
      books
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
    readRecords: records || {}
  }
}

const Dashboard_connected = connect(stateToProps, {
  readCommit: recordActions.readCommit,
  updateBook: recordActions.editBookInRecord,
  removeBook: recordActions.removeBookFromRecord
})(Dashboard_composed)

export default Dashboard_connected
