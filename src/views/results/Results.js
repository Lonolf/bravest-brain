import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'

import Table from './components/Table.js'

import translator from 'utility/translator'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    height: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    textAlign: 'center',
  },
}))

const Results = () => {
  const classes = useStyles()
  const answers = useSelector(state => state.answers)

  const correctAnswersNumber = Object.values(answers || {})
    .filter(answer => answer.correct).length

  return (
    <div className={classes.main}>
      <Typography variant='h4'>{translator.fromLabel('answers_title')}</Typography>
      <Typography variant='h6'>{translator.fromLabel('answers_correctAnswers01') + correctAnswersNumber + translator.fromLabel('answers_correctAnswers02')}</Typography>
      <Table />
      <Typography variant='h6' className={classes.text}>{translator.fromLabel('answers_text')}</Typography>
    </div>
  )
}

export default Results
