import React, { useEffect } from 'react'
import withErrorBoundary from 'components/componentError/withErrorBoundary'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import ContentManager from 'views/contentManager/ContentManager'

import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './index.css'
import * as actions from 'redux/actions'

const lightTheme = createMuiTheme({
  values: {
    componentsMaxWidth: 500,
    maxWidth: 500,
    shortDescrLength: 80,
  },
  palette: {
    type: 'light',
    modal: { main: 'rgba(10, 10, 10, 0.7)' },
    background: { paper: '#f0f0f0', default: '#b4c6e0', contrastText: '#000' },
    primary: {
      main: '#ba261a',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
      contrastText: '#fff',
    },
    error: {
      main: '#ba261a',
      contrastText: '#fff',
    },
    boxShadow: {
      primary: 'rgba(0, 0, 0, 0.2)',
      secondary: 'rgba(0, 0, 0, 0.14)',
      tertiary: 'rgba(0, 0, 0, 0.12)',
    },
  },
  typography:
    {
      fontFamily: 'Ubuntu,sans-serif',
      color: 'white',
    },
})

const App = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: actions.AUTO_LOGIN })
    dispatch({ type: actions.GET_QUIZ_INDEX })
    if (history.location.pathname !== '/login')
      history.push('/')
  }, [history, dispatch])

  return (
    <MuiThemeProvider theme={lightTheme}>
      <ContentManager />
    </MuiThemeProvider>
  )
}

export default withErrorBoundary(App)
