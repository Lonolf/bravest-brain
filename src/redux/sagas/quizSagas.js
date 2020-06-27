import { put, takeEvery, all, select } from 'redux-saga/effects'
import * as actions from 'redux/actions'
import { formatError, formatFirebaseError, formatQuiz } from 'redux/format'
import uniqid from 'uniqid'

import firebase from 'redux/firebase/firebase'
import { history } from 'index.js'

export function * watchGetQuizIndex() {
  yield takeEvery(actions.GET_QUIZ_INDEX, getQuizIndex)
}

export function * getQuizIndex() {
  yield put({ type: actions.START_LOADING, payload: { action: 'getQuizIndex' } })
  try {
    let quizIndex = yield firebase.getCollectionDoc({ collectionId: 'Quiz', docId: 'index' })
    if (quizIndex == null)
      throw formatError({ message: 'QuizIndex not found', code: 101 })
    else
      yield put({
        type: actions.REDUCE_EDIT_QUIZ_INDEX,
        payload: Object.keys(quizIndex).filter(quizId => quizIndex[quizId]),
      })
  } catch (error) {
    const newError = formatFirebaseError({ firebaseError: error })
    yield put({ type: actions.ERROR, payload: { error: newError } })
  }
  yield put({ type: actions.STOP_LOADING, payload: { action: 'getQuizIndex' } })
}

export function * watchGetQuiz() {
  yield takeEvery(actions.GET_QUIZ, getQuiz)
}

export function * getQuiz({ payload: { quizId } = {} }) {
  yield put({ type: actions.START_LOADING, payload: { action: 'getQuiz' } })
  try {
    let quiz = yield firebase.getCollectionDoc({ collectionId: 'Quiz', docId: quizId })
    if (quiz == null)
      throw formatError({ message: `Quiz '${quizId}' not valid or not found`, code: 101 })
    else
      yield put({ type: actions.REDUCE_EDIT_QUIZ, payload: quiz })
  } catch (error) {
    const newError = formatFirebaseError({ firebaseError: error })
    yield put({ type: actions.ERROR, payload: { error: newError } })
  }
  yield put({ type: actions.STOP_LOADING, payload: { action: 'getQuiz' } })
}

export function * watchCreateQuiz() {
  yield takeEvery(actions.CREATE_QUIZ, createQuiz)
}

export function * createQuiz({ payload: { quizId } }) {
  yield put({ type: actions.START_LOADING, payload: { action: 'createQuiz' } })
  try {
    const user = yield select(state => state.user)
    const quiz = formatQuiz({ quizId, userId: user.userId })

    yield firebase.setCollectionDoc({
      collectionId: 'Quiz',
      docId: quizId,
      data: quiz,
    })

    yield firebase.setCollectionDoc({
      collectionId: 'Answers',
      docId: quizId,
      data: {},
    })

    yield firebase.updateCollectionDoc({
      collectionId: 'Quiz',
      docId: 'index',
      keyId: quizId,
      data: true,
    })

    yield put({ type: actions.REDUCE_CREATE_QUIZ, payload: quiz })
    history.push('/quizEditor/1')
  } catch (error) {
    const newError = formatFirebaseError({ firebaseError: error })
    yield put({ type: actions.ERROR, payload: { error: newError } })
  }
  yield put({ type: actions.STOP_LOADING, payload: { action: 'createQuiz' } })
}

export function * watchEditQuiz() {
  yield takeEvery(actions.EDIT_QUIZ, editQuiz)
}

export function * editQuiz() {
  yield put({ type: actions.START_LOADING, payload: { action: 'editQuiz' } })
  try {
    const quiz = yield select(state => state.quiz)

    yield firebase.setCollectionDoc({
      collectionId: 'Quiz',
      docId: quiz.quizId,
      data: quiz,
    })
  } catch (error) {
    const newError = formatFirebaseError({ firebaseError: error })
    yield put({ type: actions.ERROR, payload: { error: newError } })
  }
  yield put({ type: actions.STOP_LOADING, payload: { action: 'editQuiz' } })
}

export function * watchCreateAnswer() {
  yield takeEvery(actions.CREATE_ANSWER, createAnswer)
}

export function * createAnswer({ payload: { questionId, answerId } = {} }) {
  yield put({ type: actions.START_LOADING, payload: { action: 'createAnswer' } })
  try {
    const quiz = yield select(state => state.quiz)

    const answer = {
      questionId,
      answerId,
      correct: answerId != null ? quiz.questions[questionId].answers[answerId].correct : false,
    }
    yield put({ type: actions.REDUCE_EDIT_ANSWERS, payload: { [questionId]: answer } })

    const nextQuestion = Number(questionId) + 1
    if (quiz.questions[nextQuestion] != null)
      history.push('/quizPage/' + nextQuestion)
    else
      yield elaborateResults()
  } catch (error) {
    const newError = formatFirebaseError({ firebaseError: error })
    yield put({ type: actions.ERROR, payload: { error: newError } })
  }
  yield put({ type: actions.STOP_LOADING, payload: { action: 'createAnswer' } })
}

function * elaborateResults() {
  const state = yield select()
  const data = {
    userName: state.user.userName,
    answers: state.answers,
    creationDate: new Date(),
  }
  if (state.user.userId != null)
    data.userId = state.user.userId

  yield firebase.updateCollectionDoc({
    collectionId: 'Answers',
    docId: state.quiz.quizId,
    keyId: uniqid(),
    data,
  })
  history.push('/results')
}

export default function * brandSagas() {
  yield all([
    watchGetQuizIndex(),
    watchGetQuiz(),
    watchCreateQuiz(),
    watchEditQuiz(),
    watchCreateAnswer(),
  ])
}
