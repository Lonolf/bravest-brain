import { put, takeEvery, all } from 'redux-saga/effects'
import * as actions from 'redux/actions'
import { formatFirebaseError } from 'redux/format'

import firebase from 'redux/firebase/firebase'

export function * watchGetResults() {
  yield takeEvery(actions.GET_RESULTS, getResults)
}

export function * getResults({ payload: { quizId } }) {
  yield put({ type: actions.START_LOADING, payload: { action: 'getResults' } })
  try {
    let results = yield firebase.getCollectionDoc({ collectionId: 'Answers', docId: quizId })
    yield put({ type: actions.REDUCE_EDIT_RESULTS, payload: results })
  } catch (error) {
    const newError = formatFirebaseError({ firebaseError: error })
    yield put({ type: actions.ERROR, payload: { error: newError } })
  }
  yield put({ type: actions.STOP_LOADING, payload: { action: 'getResults' } })
}

export default function * resultsSagas() {
  yield all([
    watchGetResults(),
  ])
}
