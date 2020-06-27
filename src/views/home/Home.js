import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Autocomplete from '@material-ui/lab/Autocomplete'

import translator from 'utility/translator'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from 'redux/actions'
import { Toolbar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    display: 'flex',
    minHeight: 400,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    textAlign: 'center',
  },
  selectBar: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  buttonBar: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
  },
}))

const Home = () => {
  const classes = useStyles()
  const quizIndex = useSelector(state => state.quizIndex)
  const quiz = useSelector(state => state.quiz)
  const user = useSelector(state => state.user)
  const [name, setName] = useState(user.userName || '')
  const dispatch = useDispatch()
  const history = useHistory()

  const dispatchName = () => {
    if (name !== '')
      dispatch({ type: actions.REDUCE_EDIT_USER, payload: { userName: name } })
  }

  const onCheck = () => {
    dispatch({ type: actions.AUTO_LOGIN, payload: { name: user.userName || name } })
    history.push('/quizPage/1')
  }

  const onEdit = () => {
    history.push('/quizEditor/1')
  }

  const onSelect = ({ quizId }) => {
    if (quizId == null)
      dispatch({ type: actions.REDUCE_EDIT_QUIZ, payload: {} })
    else
      dispatch({ type: actions.GET_QUIZ, payload: { quizId } })
  }

  return (
    <div className={classes.main}>
      <Typography variant='h4' className={classes.text}>{translator.fromLabel('login_title')}</Typography>
      <Typography variant='h6' className={classes.text}>{translator.fromLabel('login_text')}</Typography>
      {user.userId == null
        ? (
          <TextField
            id='name'
            value={name}
            label={translator.fromLabel('login_name')}
            onChange={event => setName(event.target.value)}
            onBlur={dispatchName}
          />
        ) : null}
      <Toolbar className={classes.selectBar}>
        <Autocomplete
          id='quiz'
          options={quizIndex}
          value={quiz.quizId || ''}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          onChange={(event, value) => onSelect({ quizId: value })}
          renderInput={(params) => <TextField {...params} label={translator.fromLabel('login_quizSelector_label')} variant='outlined' />}
        />
      </Toolbar>
      <div className={classes.buttonBar}>
        <Button
          color='primary'
          variant='contained'
          disabled={(name === '' && user.userId == null) || user.userName == null || user.userName === '' || quiz.quizId == null}
          onClick={onCheck}
        >
          {translator.fromLabel('login_check_button')}
        </Button>
        {user.userId != null && user.userId === quiz.userId
          ? (
            <>
              <Button
                color='primary'
                variant='contained'
                onClick={() => history.push('/resultsTable')}
              >
                {translator.fromLabel('login_results_button')}
              </Button>
              <Button
                color='primary'
                variant='contained'
                onClick={onEdit}
              >
                {translator.fromLabel('login_editor_button')}
              </Button>
            </>
          ) : null}
      </div>
    </div>
  )
}

export default Home
