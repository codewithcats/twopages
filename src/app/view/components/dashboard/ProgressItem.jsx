import React from 'react'
import {
  compose,
  withProps,
  shouldUpdate
} from 'recompose'
import moment from 'moment'
import styled from 'styled-components'

import {green} from '../../base/colors'

const Container = styled.div`
  display: flex;
`

const Check = styled.span`
  margin-right: 1rem;
  color: ${green['300']}
`

const ProgressItem = (props) => {
  const {dateText} = props
  return (
    <Container>
      <Check>
        <i className="fa fa-check-circle-o"></i>
      </Check>
      <div>{dateText}</div>
    </Container>
  )
}

const ProgressItem_composed = compose(
  // shouldUpdate((current, next) => {
  //   const currentRecord = current.record
  //   const nextRecord = next.record
  //   return currentRecord.date !== nextRecord.date ||
  //     currentRecord.read !== nextRecord.read
  // }),
  withProps(({record}) => {
    return {
      dateText: moment(record.date, 'YYYY-MM-DD').format('Do MMMM YYYY')
    }
  })
)(ProgressItem)

export default ProgressItem_composed
