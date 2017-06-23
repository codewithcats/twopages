import localforage from 'localforage'
import R from 'ramda'

export async function saveRecordToLocal(record) {
  return localforage.getItem('records')
  .then((records) => {
    const newRecords = R.merge(records || {}, {
      [record.date]: record
    })
    return localforage.setItem('records', newRecords)
  })
}

export async function fetchRecordsFromLocal() {
  const records = await localforage.getItem('records')
  return records
}
