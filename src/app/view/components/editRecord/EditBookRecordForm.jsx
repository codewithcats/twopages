import React from 'react'
import styled from 'styled-components'
import {
  compose,
  withState,
  withHandlers
} from 'recompose'

import {Asterisk} from '../../base/form'

const RecordTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const RecordTitle = styled.div`
  display: flex;
`

const BookTitle = styled.div`
  display: flex;
  flex: 1;
`

const BookIcon = styled.i`
  margin-right: 0.5rem;
`

const FormContainer = styled.form`
  margin-top: 2rem;
`

const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const CloseFormContainer = styled.div`
  flex: 1;
  text-align: left;
`

const Button = styled.button`
  margin-left: 0.25rem;
`

const EditBookRecordForm = (props) => {
  const {book, editing, title, pages,
    onTitleClick, onTitleChange, onPagesChange, onRemoveBookClick, onSubmit, onCloseClick} = props
  return (
    <div className="panel-block">
      <RecordTitleContainer>
        <RecordTitle onClick={onTitleClick}>
          <BookTitle>
            <BookIcon className="fa fa-book"></BookIcon>
            {book.title}
          </BookTitle>
          <span className="tag is-primary">{book.pages}</span>
        </RecordTitle>
        {editing && (
          <FormContainer onSubmit={onSubmit}>
            <div className="field">
              <p className="control">
                <label className="label">Book Title <Asterisk /></label>
                <input type="text" className="input"
                  value={title} onChange={onTitleChange}/>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <label className="label">Pages</label>
                <input type="number" className="input"
                  value={pages} onChange={onPagesChange}/>
              </p>
            </div>
            <ActionContainer className="field">
              <CloseFormContainer>
                <a className="button" onClick={onCloseClick}>close</a>
              </CloseFormContainer>
              <Button className="button is-primary">Update</Button>
              <Button className="button is-danger" onClick={onRemoveBookClick}>
                Remove
              </Button>
            </ActionContainer>
          </FormContainer>
        )}
      </RecordTitleContainer>
    </div>
  )
}

const EditBookRecordForm_composed = compose(
  withState('editing', 'setEditing', false),
  withState('title', 'setTitle', ({book}) => book.title),
  withState('pages', 'setPages', ({book}) => book.pages),
  withHandlers({
    onTitleClick: ({setEditing, editing}) => event => {
      setEditing(!editing)
    },
    onTitleChange: ({setTitle}) => event => {
      setTitle(event.target.value)
    },
    onPagesChange: ({setPages}) => event => {
      setPages(event.target.value)
    },
    onRemoveBookClick: ({removeBook, record, book}) => event => {
      event.preventDefault()
      removeBook(record, book)
    },
    onSubmit: ({updateBook, record, book, title, pages}) => event => {
      event.preventDefault()
      const updatedBook = {title, pages}
      updateBook(record, book, updatedBook)
    },
    onCloseClick: ({setEditing}) => event => {
      event.preventDefault()
      setEditing(false)
    }
  })
)(EditBookRecordForm)

export default EditBookRecordForm_composed
