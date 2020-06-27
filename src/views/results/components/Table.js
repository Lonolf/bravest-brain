import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { useSelector } from 'react-redux'

import translator from 'utility/translator'
import { Typography, Toolbar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  title: {
    justifyContent: 'space-evenly',
  },
  questionCell: {
    border: '2px solid black',
  },
  answerCell: {
    border: '2px solid black',
  },
}))

const ResultsTable = () => {
  const classes = useStyles()
  const answers = useSelector(state => state.answers)
  const quiz = useSelector(state => state.quiz)

  return (
    <>
      <Toolbar className={classes.title}>
        <Typography variant='h4'>{translator.fromLabel('resultsTable_title') + quiz.quizTitle + '"'}</Typography>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              {Object.values(quiz.questions || {})
                .sort((a, b) => Number(a.questionId) >= Number(b.questionId) ? 1 : -1)
                .map(question => <QuestionCell props={{ question }} />)}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {Object.values(answers)
                .sort((a, b) => Number(a.questionId) >= Number(b.questionId) ? 1 : -1)
                .map(answer => <AnswerCell key={answer.questionId} props={{ quiz, answer }} />)}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

const QuestionCell = ({ props: { question: { questionId, questionText } } }) => {
  const classes = useStyles()

  return (
    <Tooltip placement='top' title={questionText}>
      <TableCell align='center' key={questionId} className={classes.questionCell}>{questionId}</TableCell>
    </Tooltip>
  )
}

const AnswerCell = ({ props: { quiz: { questions = {} }, answer: { answerId, questionId, correct } = {} } = {} }) => {
  const classes = useStyles()
  const text = questions[questionId] != null && questions[questionId].answers[answerId] != null
    ? questions[questionId].answers[answerId].text : ''

  return (
    <Tooltip placement='top' title={text}>
      <TableCell style={{ backgroundColor: correct ? 'darkgreen' : 'darkred' }} className={classes.answerCell}>
        {answerId}
      </TableCell>
    </Tooltip>
  )
}

export default ResultsTable
