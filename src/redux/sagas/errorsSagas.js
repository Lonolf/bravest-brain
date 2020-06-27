import { put, takeEvery, all } from 'redux-saga/effects'
import * as actions from 'redux/actions'
import { history } from 'index'
import { matchPath } from 'react-router'

import uniqid from 'uniqid'

function * watchCreateError() {
  yield takeEvery(actions.ERROR, createError)
}

// eslint-disable-next-line
const code = {
  101: 'Generic Brand error.',
  102: 'Brand not existent, not active or forbidden.',
  103: 'Brand photos not found.',
  201: 'Generic Store error.',
  202: 'Store not existent, not active or forbidden.',
  303: 'Product photos non found.',
  402: 'Order timeout error.',
}

function * createError({ payload: { error, error: { message = '', name = '', stack, code } } }) {
  try {
    console.error(error)

    error.errorId = uniqid()
    const { brandId } = getParams({ path: history.location.pathname })

    switch (error.code) {
      case 'unavailable':
        window.location.reload(true)
        break
      case 101:
      case 102:
      case 201:
        if (process.env.REACT_APP_ENV !== 'production')
          yield put({ type: actions.REDUCE_CREATE_ERROR, payload: { error } })
        history.push('/')
        break
      case 202:
        history.push(`/${brandId}`)
        if (process.env.REACT_APP_ENV !== 'production')
          yield put({ type: actions.REDUCE_CREATE_ERROR, payload: { error } })
        break
      case 103:
      case 303:
        break
      case 402:
      default:
        yield put({ type: actions.REDUCE_CREATE_ERROR, payload: { error } })
        break
    }
  } catch (error) {
    console.log(error)
  }
}

const getParams = ({ path }) => {
  const match = matchPath(path, {
    path: '/:brandId/:storeId?/:view?',
    exact: true,
    strict: false,
  })
  if (match.isExact)
    return match.params
  else
    return {}
}

export default function * errorsSagas() {
  yield all([
    watchCreateError(),
  ])
}
