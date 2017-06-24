import React from 'react'
import {
  compose,
  withProps
} from 'recompose'
import moment from 'moment'

import EditBookRecordForm from './EditBookRecordForm'

const EditRecordForm = (props) => {
  const {record, dateStr, books} = props
  return (
    <div>
      <h5>Edit Reading Record</h5>
      <h4 className="title is-4">
        <i className="fa fa-calendar-check-o"></i> {dateStr}
      </h4>
      <section className="panel">
        {books.map(book => (
          <EditBookRecordForm book={book} key={book.title}/>
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

export default EditRecordForm_composed
