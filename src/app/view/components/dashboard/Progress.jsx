import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'
import {
  compose,
  mapProps
} from 'recompose'

import {lens as recordLens} from '../../../state/ducks/record'

import ProgressItem from './ProgressItem'

const Progress = (props) => {
  const {readRecords} = props
  return (
    <section>
      <h5 className="title is-5">
        My Progress
      </h5>
      {readRecords.map(record => (
        <ProgressItem record={record} key={record.date} />
      ))}
    </section>
  )
}

const Progress_composed = compose(
  mapProps(({readRecords, readRecordsOrder}) => ({
    readRecords: readRecordsOrder.map(key => readRecords[key])
  }))
)(Progress)

function stateToProps(state) {
  const records = R.view(recordLens.recordsLens, state.record)
  const recordOrder = R.view(recordLens.recordOrderLens, state.record)
  return {
    readRecords: records || {},
    readRecordsOrder: recordOrder || []
  }
}

const Progress_connected = connect(stateToProps)(Progress_composed)

export default Progress_connected
