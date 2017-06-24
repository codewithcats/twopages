import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'
import {
  compose,
  withState,
  withHandlers,
  lifecycle
} from 'recompose'
import classnames from 'classnames'

import {
  actions as recordActions,
  lens as recordLens
} from '../../../state/ducks/record'

import {Asterisk} from '../../base/form'

const RecordDetailForm = (props) => {
  const {bookTitle, pages, pending,
    onBookTitleChange, onPagesChange, onSubmit} = props
  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label className="label">
          Book title <Asterisk/>
        </label>
        <p className="control">
          <input type="text" className="input"
            value={bookTitle} onChange={onBookTitleChange} />
        </p>
      </div>
      <div className="field">
        <label className="label">Number of pages you have read today</label>
        <p className="control">
          <input type="number" className="input"
            value={pages} onChange={onPagesChange} />
        </p>
      </div>
      <div className="field">
        <p className="control">
          <button className={classnames("button is-primary", {'is-loading': pending})}
            disabled={!bookTitle}>
            Save
          </button>
        </p>
      </div>
    </form>
  )
}

const RecordDetailForm_composed = compose(
  withState('bookTitle', 'setBookTitle', ''),
  withState('pages', 'setPages', 2),
  withHandlers({
    onBookTitleChange: ({setBookTitle}) => (event) => {
      setBookTitle(event.target.value)
    },
    onPagesChange: ({setPages}) => (event) => {
      setPages(event.target.value)
    },
    onSubmit: ({record, bookTitle, pages, addBook}) => (event) => {
      event.preventDefault()
      const book = {
        title: bookTitle
      }
      addBook(record, book, pages)
    }
  }),
  lifecycle({
    componentWillReceiveProps(next) {
      if (this.props.pending === true && next.pending === false) {
        this.props.setBookTitle('')
        this.props.setPages(2)
      }
    }
  })
)(RecordDetailForm)

function stateToProps(state) {
  return {
    pending: R.view(recordLens.addBookToRecordPending, state.record)
  }
}

const RecordDetailForm_connected = connect(stateToProps, {
  addBook: recordActions.addBookToRecord
})(RecordDetailForm_composed)

export default RecordDetailForm_connected
