import { combineReducers } from 'redux'

import * as actions from './actions'

const questionModel = {
  type: 'multipleChoices',
  questionText: '',
  questionId: 0,
  answers: {
    1: {
      answerId: '1',
      correct: false,
      text: '',
    },
    2: {
      answerId: '2',
      correct: false,
      text: '',
    },
  },
}

function answers(state = {}, { type, payload }) {
  switch (type) {
    case actions.REDUCE_EDIT_ANSWERS:
      return { ...state, ...payload }
    default:
      return state
  }
}

function error(state = {}, { type, payload: { error: { errorId, message } = {} } = {} }) {
  switch (type) {
    case actions.REDUCE_CREATE_ERROR:
      return { ...state, [errorId]: { message, errorId } }
    case actions.REDUCE_DELETE_ERROR:
      let newState = { ...state }
      delete newState[errorId]
      return newState
    default:
      return state
  }
}

function loading(state = [], action) {
  switch (action.type) {
    case actions.START_LOADING:
      return [...state, action.payload.action]
    case actions.STOP_LOADING:
      return state.filter(x => x !== action.payload.action)
    default:
      return state
  }
}

function user(state = {}, { type, payload }) {
  switch (type) {
    case actions.REDUCE_EDIT_USER:
      return payload
    default:
      return state
  }
}

function quizIndex(state = [], { type, payload }) {
  switch (type) {
    case actions.REDUCE_CREATE_QUIZ:
      return [...state, payload.quizId]
    case actions.REDUCE_EDIT_QUIZ_INDEX:
      return payload
    default:
      return state
  }
}

function quiz(state = {}, { type, payload }) {
  let newState = {}
  switch (type) {
    case actions.REDUCE_CREATE_QUIZ:
      return payload
    case actions.REDUCE_EDIT_QUIZ:
      return payload
    case actions.REDUCE_CREATE_QUESTION:
      newState = JSON.parse(JSON.stringify(state))
      newState.questions[payload.questionId] = {
        ...JSON.parse(JSON.stringify(questionModel)),
        questionId: payload.questionId,
      }
      return newState
    case actions.REDUCE_EDIT_QUESTION:
      newState = JSON.parse(JSON.stringify(state))
      newState.questions[payload.questionId] = { ...payload }
      return newState
    default:
      return state
  }
}

function results(state = [], { type, payload }) {
  switch (type) {
    case actions.REDUCE_EDIT_RESULTS:
      return payload
    default:
      return state
  }
}

const rootReducer = combineReducers({
  answers,
  error,
  loading,
  quiz,
  quizIndex,
  user,
  results,
})

export default rootReducer
