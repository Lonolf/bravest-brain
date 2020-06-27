import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  mainProgress: {
    width: '100%',
    display: 'flex',
    borderTop: '2px solid',
    borderBottom: '2px solid',
  },
  questionMarker: {
    height: 50,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.contrastText,
  },
}))

const ProgressBar = () => {
  const classes = useStyles()
  const answers = useSelector(state => state.answers)
  const quiz = useSelector(state => state.quiz)
  const { questionId } = useParams()

  const getBackgroundColor = ({ question }) =>
    question.questionId === questionId ? 'black'
      : answers[question.questionId] != null
        ? (quiz.obfuscateResults ? 'grey' : answers[question.questionId].correct ? 'darkgreen' : 'darkred')
        : null

  return (
    <div className={classes.mainProgress}>
      {Object.values(quiz.questions || {}).map(question => (
        <div className={classes.questionMarker} key={question.questionId} style={{ backgroundColor: getBackgroundColor({ question: question }) }}>
          {question.questionId}
        </div>
      ))}
    </div>
  )
}

export default ProgressBar
