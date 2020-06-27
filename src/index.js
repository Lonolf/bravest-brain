import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

import './index.css'

import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

// redux
import rootReducer from './redux/reducers'
import { Provider } from 'react-redux'
import rootSaga from './redux/sagas'

import SizeSwitcher from 'components/sizeSwitcher/SizeSwitcher'

if (process.env.REACT_APP_ENV === 'production')
  disableDevTools()

// middleware creation
const logger = store => next => action => {
  if (process.env.REACT_APP_ENV === 'production')
    return next(action)
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const sagaMiddleware = createSagaMiddleware()

export const history = createBrowserHistory()

// store creation
export const store = createStore(
  rootReducer, // new root reducer with router state
  applyMiddleware(
    logger,
    sagaMiddleware,
    // ... other middlewares ...
  ),
)
// run rootSagaWatcher
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <SizeSwitcher>
        <Router history={history}>
          <Route component={App} />
        </Router>
      </SizeSwitcher>
    </MuiPickersUtilsProvider>
  </Provider>
  , document.getElementById('root'),
)

if (window.Cypress && process.env.REACT_APP_ENV !== 'production')
  window.store = store

function disableDevTools() {
  for (const prop in window.__REACT_DEVTOOLS_GLOBAL_HOOK__)
    if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'function')
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = () => {}
    else
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = null
}
