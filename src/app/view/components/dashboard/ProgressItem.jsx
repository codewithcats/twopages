import React from 'react'
import {
  compose,
  withProps,
  shouldUpdate
} from 'recompose'
import moment from 'moment'

const ProgressItem = (props) => {
  const {dateText} = props
  return (
    <div>{dateText}</div>
  )
}

const ProgressItem_composed = compose(
  shouldUpdate((current, next) => {
    const currentRecord = current.record
    const nextRecord = next.record
    return currentRecord.date !== nextRecord.date ||
      currentRecord.read !== nextRecord.read
  }),
  withProps(({record}) => {
    return {
      dateText: moment(record.date, 'YYYY-MM-DD').format('Do MMMM YYYY')
    }
  })
)(ProgressItem)

export default ProgressItem_composed
