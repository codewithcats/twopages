import React from 'react'
import {connect} from 'react-redux'
import {
  compose,
  withProps
} from 'recompose'
import moment from 'moment'

import {actions as recordActions} from '../../../state/ducks/record'

import EditBookRecordForm from './EditBookRecordForm'

const EditRecordForm = (props) => {
  const {record, dateStr, books, removeBook} = props
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
      books: record.books || []
    }
  })
)(EditRecordForm)

const EditBookRecordForm_connected = connect(null, {
  removeBook: recordActions.removeBookFromRecord
})(EditRecordForm_composed)

export default EditBookRecordForm_connected
