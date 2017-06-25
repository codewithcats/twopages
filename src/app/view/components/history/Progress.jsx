import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'
import {
  compose,
  withProps
} from 'recompose'
import styled from 'styled-components'

import {
  lens as recordLens,
  actions as recordActions
} from '../../../state/ducks/record'

import ProgressItem from './ProgressItem'

const ProgressTitle = styled.h5`
  margin-bottom: 0 !important;
`

const ProgressInfoText = styled.span`
  display: block;
  margin-bottom: 1rem;
`

const Progress = (props) => {
  const {readRecords, editRecord} = props
  return (
    <section>
      <ProgressTitle className="title is-5">
        My Progress
      </ProgressTitle>
      <ProgressInfoText>Tap to edit</ProgressInfoText>
      {readRecords.map(record => (
        <ProgressItem record={record} key={record.date}
          editRecord={editRecord}/>
      ))}
    </section>
  )
}

const Progress_composed = compose(
  withProps(({readRecords, readRecordsOrder}) => ({
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

const Progress_connected = connect(stateToProps, {
  editRecord: recordActions.toEditRecord
})(Progress_composed)

export default Progress_connected
