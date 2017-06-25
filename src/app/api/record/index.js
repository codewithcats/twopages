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

export async function updateRecords(user, records) {
  const recordsRef = database().ref(`user-records/${user.uid}`)
  return new Promise((resolve, reject) => {
    recordsRef.update(records, error => {
      error? reject(error): resolve(records)
    })
  })
}

export async function oneTimeSync(user, books, records) {
  return updateBooks(books)
  .then(() => {
    return updateRecords(user, records)
  })
}

export async function fetchRecords(user) {
  const recordsRef = database().ref(`user-records/${user.uid}`)
  return recordsRef.once('value')
  .then(snapshot => {
    return snapshot.val()
  })
}

export async function removeBookFromLocalRecord(record, book) {
  const newBooks = R.filter(rb => rb.title !== book.title, record.books || [])
  record.books = newBooks
  return saveRecordToLocal(record)
}

export async function removeBookFromRecord(user, record, book) {
  const newBooks = R.filter(rb => rb.title !== book.title, record.books || [])
  record.books = newBooks
  const records = {[record.date]: record}
  return updateRecords(user, records)
}
