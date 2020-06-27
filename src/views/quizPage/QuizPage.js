import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'

import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import ProgressBar from 'components/progressBar/ProgressBar'

import * as actions from 'redux/actions'

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '30px 0px',
  },
  quizTitle: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  answersContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    color: theme.palette.primary.contrastText,
    justifyContent: 'center',
    margin: '30px 0px',
  },
  answerSquare: {
    width: '50%',
    minWidth: 300,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
}))

const colors = {
  1: { backgroundColor: 'darkred' },
  2: { backgroundColor: 'darkblue' },
  3: { backgroundColor: 'orange' },
  4: { backgroundColor: 'darkgreen' },
}

const QuizPage = () => {
  const classes = useStyles()
  const { questionId } = useParams()
  const quiz = useSelector(state => state.quiz)
  const question = (quiz.questions || {})[questionId] || {}
  const dispatch = useDispatch()

  const onClick = ({ answerId }) => {
    dispatch({ type: actions.CREATE_ANSWER, payload: { questionId, answerId } })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: actions.CREATE_ANSWER, payload: { questionId, answerId: null } })
    }, quiz.answersTime || 60000)
    return () => clearTimeout(timer)
  }, [dispatch, questionId, quiz.answersTime])

  return (
    <div className={classes.main}>
      <QuestionHeader props={{ quiz, question, classes }} />
      <QuestionAnswers props={{ classes, question, onClick }} />
      <ProgressBar />
    </div>
  )
}

const QuestionHeader = ({ props: { quiz = {}, question = {}, classes = {} } }) => (
  <>
    <div className={classes.quizTitle}>
      <Typography variant='h2'>{quiz.quizTitle}</Typography>
    </div>
    <div>
      <Typography variant='h4'>{question.questionText}</Typography>
    </div>
  </>
)

const QuestionAnswers = ({ props: { classes = {}, question = {}, onClick = () => {} } }) => (
  <div className={classes.answersContainer}>
    {Object.values(question.answers || {}).map(({ answerId, text }) => {
      return (
        <div key={answerId} style={colors[answerId]} onClick={() => onClick({ answerId })} className={classes.answerSquare}>
          <Typography variant='h5'>{text}</Typography>
        </div>
      )
    })}
  </div>
)

export default QuizPage
