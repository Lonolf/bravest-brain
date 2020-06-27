import { put, takeEvery, all } from 'redux-saga/effects'
import * as actions from 'redux/actions'
import { formatFirebaseError } from 'redux/format'
import firebase from 'redux/firebase/firebase'

export function * watchAutoLogin() {
  yield takeEvery(actions.AUTO_LOGIN, autoLogin)
}

export function * autoLogin() {
  yield put({ type: actions.START_LOADING, payload: { action: 'login' } })
  try {
    const user = yield firebase.autoSignIn()
    if (user !== false)
      yield put({ type: actions.REDUCE_EDIT_USER, payload: user })
  } catch (error) {
    const newError = formatFirebaseError({ firebaseError: error })
    yield put({ type: actions.ERROR, payload: { error: newError } })
  }
  yield put({ type: actions.STOP_LOADING, payload: { action: 'login' } })
}

export function * watchLogout() {
  yield takeEvery(actions.LOGOUT, logout)
}

export function * logout() {
  yield put({ type: actions.START_LOADING, payload: { action: 'logout' } })
  try {
    yield firebase.signOut()
    yield put({ type: actions.REDUCE_LOGOUT, payload: {} })
    window.location.reload(true)
  } catch (error) {
    yield put({ type: actions.ERROR, payload: { error: error.message } })
  }
  yield put({ type: actions.STOP_LOADING, payload: { action: 'logout' } })
}

export default function * userSagas() {
  yield all([
    watchAutoLogin(),
    watchLogout(),
  ])
}
