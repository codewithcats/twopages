import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'
import {
  compose,
  withProps
} from 'recompose'
import moment from 'moment'
import styled from 'styled-components'

import {actions as recordActions, lens as recordLens} from '../../../state/ducks/record'
import {lens as routingLens} from '../../../state/ducks/routing'

import EditBookRecordForm from './EditBookRecordForm'
import {RecordDetailForm} from '../record'

const Container = styled.div`
  padding-bottom: 5rem;
`

const EditRecordForm = (props) => {
  const {record, dateStr, books, removeBook, updateBook} = props
  console.debug('EditRecordForm.render', record)
  return (
    <Container>
      <h5>Edit Reading Record</h5>
      <h4 className="title is-4">
        <i className="fa fa-calendar-check-o"></i> {dateStr}
      </h4>
      <section className="panel">
        {books.map(book => (
          <EditBookRecordForm book={book} key={book.title} record={record}
            removeBook={removeBook} updateBook={updateBook}/>
        ))}
      </section>
      <div>
        <h5>Add More Book You Have Read</h5>
        <RecordDetailForm record={record} />
      </div>
    </Container>
  )
}

const EditRecordForm_composed = compose(
  withProps(({record}) => {
    return {
      dateStr: moment(record.date, 'YYYY-MM-DD').format('Do MMMM YYYY'),
    }
  })
)(EditRecordForm)

function stateToProps(state) {
  const {params: {record: recordDate}} = R.view(routingLens.currentStateLens, state.routing)
  const records = R.view(recordLens.recordsLens, state.record)
  const targetRecord = records[recordDate]
  return {
    record: targetRecord,
    books: targetRecord.books || []
  }
}

const EditBookRecordForm_connected = connect(stateToProps, {
  removeBook: recordActions.removeBookFromRecord,
  updateBook: recordActions.editBookInRecord
})(EditRecordForm_composed)

export default EditBookRecordForm_connected
