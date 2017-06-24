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
  flex: 1;
`

const FormContainer = styled.form`
  margin-top: 2rem;
`

const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Button = styled.button`
  margin-left: 0.25rem;
`

const EditBookRecordForm = (props) => {
  const {book, editing,
    onTitleClick} = props
  return (
    <div className="panel-block">
      <RecordTitleContainer>
        <RecordTitle onClick={onTitleClick}>
          <BookTitle>
            {book.title}
          </BookTitle>
          <span>{book.pages}</span>
        </RecordTitle>
        {editing && (
          <FormContainer>
            <div className="field">
              <p className="control">
                <label className="label">Book Title <Asterisk /></label>
                <input type="text" className="input"/>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <label className="label">Pages</label>
                <input type="number" className="input"/>
              </p>
            </div>
            <ActionContainer className="field">
              <Button className="button is-primary">Update</Button>
              <Button className="button is-danger">Remove</Button>
            </ActionContainer>
          </FormContainer>
        )}
      </RecordTitleContainer>
    </div>
  )
}

const EditBookRecordForm_composed = compose(
  withState('editing', 'setEditing', false),
  withHandlers({
    onTitleClick: ({setEditing, editing}) => event => {
      setEditing(!editing)
    }
  })
)(EditBookRecordForm)

export default EditBookRecordForm_composed
