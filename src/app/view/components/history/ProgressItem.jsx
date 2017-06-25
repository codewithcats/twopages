import React from 'react'
import {
  compose,
  withProps,
  withHandlers
} from 'recompose'
import moment from 'moment'
import styled from 'styled-components'

import {green, purple} from '../../base/colors'

const Container = styled.div`
  display: flex;
  cursor: pointer;
`

const Check = styled.span`
  margin-right: 1rem;
  color: ${green['A400']}
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Pages = styled.span`
  font-weight: bold;
  color: ${purple['300']}
`

const ProgressItem = (props) => {
  const {dateText, books,
    onItemClick} = props
  return (
    <Container onClick={onItemClick}>
      <Check>
        <i className="fa fa-check-circle-o"></i>
      </Check>
      <InfoContainer>
        <strong>{dateText}</strong>
        {books.map(book => (
          <div key={book.title}>
            <Pages>{book.pages}</Pages>
            &nbsp;on&nbsp;{book.title}
          </div>
        ))}
      </InfoContainer>
    </Container>
  )
}
const ProgressItem_composed = compose(
  withProps(({record}) => {
    return {
      dateText: moment(record.date, 'YYYY-MM-DD').format('Do MMMM YYYY'),
      books: record.books || []
    }
  }),
  withHandlers({
    onItemClick: ({editRecord, record}) => event => {
      editRecord(record)
    }
  })
)(ProgressItem)

export default ProgressItem_composed
