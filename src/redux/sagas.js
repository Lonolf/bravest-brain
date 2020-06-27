import { all } from 'redux-saga/effects'

import errorsSagas from 'redux/sagas/errorsSagas'
import quizSagas from 'redux/sagas/quizSagas'
import resultsSagas from 'redux/sagas/resultsSagas'
import userSagas from 'redux/sagas/userSagas'

export default function * rootSaga() {
  yield all([
    errorsSagas(),
    quizSagas(),
    resultsSagas(),
    userSagas(),
  ])
}
