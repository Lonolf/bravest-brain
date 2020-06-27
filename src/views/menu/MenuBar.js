import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'

import translator from 'utility/translator'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from 'redux/actions'
import { Toolbar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  titleBar: {
    justifyContent: 'space-between',
    borderTop: '2px solid ' + theme.palette.background.contrastText,
    borderBottom: '2px solid ' + theme.palette.background.contrastText,
  },
}))

const Home = () => {
  const classes = useStyles()
  const user = useSelector(state => state.user)
  const history = useHistory()
  const dispatch = useDispatch()

  return (
    <Toolbar className={classes.titleBar}>
      <Button variant='contained' onClick={() => history.push('/')}>
        {translator.fromLabel('menuBar_home')}
      </Button>
      <div style={{ flex: '1 1 10px' }} />
      {user.userName != null && user.userName !== ''
        ? (
          <>
            <Button variant='outlined'>{user.userName}</Button>
            <div style={{ flex: '0 1 10px' }} />
          </>
        ) : null}
      {user.userId == null
        ? (
          <Button variant='contained' onClick={() => history.push('/login')}>
            {translator.fromLabel('menuBar_login')}
          </Button>
        ) : (
          <Button variant='contained' onClick={() => dispatch({ type: actions.LOGOUT })}>
            {translator.fromLabel('menuBar_logout')}
          </Button>
        )}
    </Toolbar>
  )
}

export default Home
