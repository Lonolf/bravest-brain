import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase'

import { history } from 'index.js'

import { useSelector } from 'react-redux'

const style = {
  externalDiv: {
    height: '100vh',
    wifth: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  internalDiv: {
    height: 450,
    width: 300,
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
}

const Login = props => {
  const state = useSelector(state => state)

  const uiConfig = {
    signInSuccessUrl: history.location.pathname + '/login',
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  }
  return (
    <div style={style.externalDiv}>
      <div style={style.internalDiv}>
        {state.loading.length > 0
          ? <CircularProgress variant='indeterminate' size={25} style={{ marginRight: 5 }} />
          : (
            <>
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </>
          )}
      </div>
    </div>
  )
}

export default Login
