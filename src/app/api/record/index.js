import {database} from 'firebase'
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

export async function saveBookToLocal(book) {
  const books = (await localforage.getItem('books')) || {}
  const newBooks = R.merge(books, {
    [book.title]: book
  })
  return localforage.setItem('books', newBooks)
}

export async function fetchBooksFromLocal() {
  return localforage.getItem('books')
}

export async function updateBooks(books) {
  const booksRef = database().ref('books')
  return new Promise((resolve, reject) => {
    booksRef.update(books, (error) => {
      error? reject(error): resolve(books)
    })
  })
}

export async function pushRecord(user, record) {
  const recordsRef = database().ref(`user-records/${user.uid}`)
  const key = recordsRef.push().key
  const updates = {
    [key]: record
  }
  return new Promise((resolve, reject) => {
    recordsRef.update(updates, error => {
      error? reject(error): resolve(record)
    })
  })
}

export async function oneTimeSync(user, books, records) {
  console.debug('oneTimeSync', user, books, records)
  return updateBooks(books)
  .then(() => {
    const promises = R.pipe(
      R.values,
      R.map(record => pushRecord(user, record))
    )(records)
    return Promise.all(promises)
  })
}
