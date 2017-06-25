import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'
import {
  compose,
  withProps
} from 'recompose'
import moment from 'moment'

import {actions as recordActions, lens as recordLens} from '../../../state/ducks/record'
import {lens as routingLens} from '../../../state/ducks/routing'

import EditBookRecordForm from './EditBookRecordForm'

const EditRecordForm = (props) => {
  const {record, dateStr, books, removeBook} = props
  console.debug('EditRecordForm.render', record)
  return (
    <div>
      <h5>Edit Reading Record</h5>
      <h4 className="title is-4">
        <i className="fa fa-calendar-check-o"></i> {dateStr}
      </h4>
      <section className="panel">
        {books.map(book => (
          <EditBookRecordForm book={book} key={book.title} record={record}
            removeBook={removeBook}/>
        ))}
      </section>
    </div>
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
  removeBook: recordActions.removeBookFromRecord
})(EditRecordForm_composed)

export default EditBookRecordForm_connected
