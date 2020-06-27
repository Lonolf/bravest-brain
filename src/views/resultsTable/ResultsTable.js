import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import { useSelector, useDispatch } from 'react-redux'
import * as actions from 'redux/actions'

import moment from 'moment'
import translator from 'utility/translator'
import { Typography, Toolbar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  resultContainer: {
    padding: '30px 0px',
  },
  title: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingBottom: 15,
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
  const results = useSelector(state => state.results)
  const quiz = useSelector(state => state.quiz)
  const dispatch = useDispatch()

  useEffect(() => {
    if (quiz.quizId != null)
      dispatch({ type: actions.GET_RESULTS, payload: { quizId: quiz.quizId } })
  }, [quiz.quizId, dispatch])

  const calculateTotals = ({ answers = {} }) =>
    Object.values(answers).filter(({ correct }) => correct).length + '/' + Object.keys(answers).length

  return (
    <div className={classes.resultContainer}>
      <Toolbar className={classes.title}>
        <Typography variant='h4'>{translator.fromLabel('resultsTable_title') + quiz.quizTitle + '"'}</Typography>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>{translator.fromLabel('resultsTable_date_label')}</TableCell>
              <TableCell>{translator.fromLabel('resultsTable_name_label')}</TableCell>
              <TableCell>{translator.fromLabel('resultsTable_results_label')}</TableCell>
              {Object.values(quiz.questions || {})
                .sort((a, b) => Number(a.questionId) >= Number(b.questionId) ? 1 : -1)
                .map(question => <QuestionCell props={{ question }} />)}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(results || {}).map(([answerId, { answers = {}, userName, creationDate }]) => (
              <TableRow key={answerId}>
                <TableCell>{moment(creationDate.toDate()).format('HH:mm DD/MM/YY')}</TableCell>
                <TableCell component='th' scope='row'>{userName}</TableCell>
                <TableCell>{calculateTotals({ answers })}</TableCell>
                {Object.values(answers)
                  .sort((a, b) => Number(a.questionId) >= Number(b.questionId) ? 1 : -1)
                  .map(answer => <AnswerCell key={answerId + answer.questionId} props={{ quiz, answer }} />)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
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
