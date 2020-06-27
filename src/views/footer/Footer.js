import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import translator from 'utility/translator'
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

const Footer = () => {
  const classes = useStyles()
  const user = useSelector(state => state.user)

  return (
    <Toolbar className={classes.titleBar}>
      {user.userId != null ? <QuizCreator /> : null}
    </Toolbar>
  )
}

const QuizCreator = () => {
  const quizIndex = useSelector(state => state.quizIndex)
  const [quizId, setQuizId] = useState('')
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => {
    if (quizIndex.includes(quizId))
      setError('quizCreator_quizIdAlreadyUser_error')
    else
      setError(null)
  }, [quizIndex, quizId])

  const onCheck = () => {
    dispatch({ type: actions.CREATE_QUIZ, payload: { quizId } })
  }

  return (
    <Toolbar className={classes.quizCreatorBar}>
      <TextField
        id='newQuizId'
        value={quizId}
        label={translator.fromLabel('quizCreator_newQuizId_label')}
        onChange={event => setQuizId(event.target.value.replace(/[^A-Za-z0-9_-]/g, ''))}
        error={error != null}
        helperText={error || ''}
      />
      <Button
        color='primary'
        variant='contained'
        onClick={onCheck}
        disabled={quizId === '' || error != null}
      >
        {translator.fromLabel('quizCreator_createQuiz')}
      </Button>
    </Toolbar>
  )
}

export default Footer
