import React from 'react'
import {
  compose,
  withState,
  withHandlers
} from 'recompose'

const RecordDetailForm = (props) => {
  const {bookTitle, pages, onBookTitleChange, onPagesChange} = props
  return (
    <form>
      <div className="field">
        <label className="label">Book title</label>
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
          <button className="button is-primary">
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
    }
  })
)(RecordDetailForm)

export default RecordDetailForm
