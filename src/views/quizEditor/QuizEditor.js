import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'

import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowRight from '@material-ui/icons/ArrowRight'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
import Edit from '@material-ui/icons/Edit'

import translator from 'utility/translator'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import EditQuizProperties from './components/EditQuizProperties'

import * as actions from 'redux/actions'

const useStyles = makeStyles((theme) => ({
  main: {
    width: 600,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  text: {
    textAlign: 'center',
  },
  answerContainer: {
    width: '100%',
  },
  buttonBar: {
    width: '100%',
    justifyContent: 'space-evenly',
  },
}))

const QuizEditor = () => {
  const classes = useStyles()
  const quiz = useSelector(state => state.quiz)
  const [values, setValues] = useState({})
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch()
  const { questionId } = useParams()
  const question = (quiz.questions || {})[questionId] || {}
  const history = useHistory()

  useEffect(() => {
    if (values.questionId !== questionId)
      setValues({
        ...JSON.parse(JSON.stringify(question)),
        questionId,
      })
  }, [questionId, question, values.questionId])

  const goBack = () => {
    dispatch({ type: actions.REDUCE_EDIT_QUESTION, payload: values })
    history.push('/quizEditor/' + (Number(questionId) - 1))
  }

  const goForward = () => {
    dispatch({ type: actions.REDUCE_EDIT_QUESTION, payload: values })

    const nextQuestionId = Number(questionId) + 1
    if (quiz.questions[nextQuestionId] != null) {
      history.push('/quizEditor/' + nextQuestionId)
    } else {
      dispatch({ type: actions.REDUCE_CREATE_QUESTION, payload: { questionId: String(nextQuestionId) } })
      history.push('/quizEditor/' + nextQuestionId)
    }
  }

  const onChangeAnswerText = ({ answerId, text }) => {
    const newValues = JSON.parse(JSON.stringify(values))
    newValues.answers[answerId].text = text
    setValues(newValues)
  }

  const onChangeAnswerCorrect = ({ answerId }) => {
    const newValues = JSON.parse(JSON.stringify(values))
    newValues.answers[answerId].correct = !values.answers[answerId].correct
    setValues(newValues)
  }

  const addAnswer = () => {
    const newValues = JSON.parse(JSON.stringify(values))
    const answerId = Object.keys(newValues.answers).length + 1
    newValues.answers[answerId] = { text: '', correct: false, answerId }
    setValues(newValues)
  }

  const removeAnswer = () => {
    const newValues = JSON.parse(JSON.stringify(values))
    const answerId = Object.keys(newValues.answers).length
    delete newValues.answers[answerId]
    setValues(newValues)
  }

  const onSave = () => {
    dispatch({ type: actions.REDUCE_EDIT_QUESTION, payload: values })
    dispatch({ type: actions.EDIT_QUIZ, payload: { values } })
  }

  const checkComplete = () =>
    Object.values(values.answers || {}).filter(answer => answer.correct).length > 0

  return (
    <>
      <EditQuizProperties props={{ modal, setModal }} />
      <div className={classes.main}>
        <Toolbar className={classes.title}>
          <Button variant='outlined' disabled={questionId === '1'} onClick={goBack}><ArrowLeft /></Button>
          <Typography variant='h4'>{quiz.quizTitle}</Typography>
          <Button variant='contained' onClick={() => setModal(true)}><Edit /></Button>
          <Button variant='outlined' onClick={goForward}><ArrowRight /></Button>
        </Toolbar>
        <TextField
          id='questionText'
          value={values.questionText}
          label={translator.fromLabel('quizEditor_questionText_label')}
          onChange={event => setValues({ ...values, questionText: event.target.value })}
          fullWidth
        />
        <div className={classes.answerContainer}>
          {Object.values(values.answers || {})
            .sort((a, b) => a.answerId > b.answerId ? 1 : -1)
            .map(({ answerId, correct, text }) => {
              return (
                <Toolbar key={answerId}>
                  {answerId}
                  <TextField
                    label={translator.fromLabel('quizEditor_answerText_label')}
                    value={text}
                    onChange={event => onChangeAnswerText({ answerId, text: event.target.value })}
                    fullWidth
                  />
                  <Switch
                    checked={correct}
                    onChange={() => onChangeAnswerCorrect({ answerId })}
                    name='correct'
                    color='primary'
                    inputProps={{ 'aria-label': 'correct answer' }}
                  />
                </Toolbar>
              )
            })}
        </div>
        <Toolbar className={classes.buttonBar}>
          <Button variant='outlined' onClick={addAnswer}><Add /></Button>
          <Button disabled={!checkComplete()} color='primary' variant='contained' onClick={onSave}>{translator.fromLabel('quizEditor_save_button')}</Button>
          <Button variant='outlined' onClick={removeAnswer}><Remove /></Button>
        </Toolbar>
      </div>
    </>
  )
}

export default QuizEditor
