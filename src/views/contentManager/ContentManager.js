import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Footer from 'views/footer/Footer'
import Home from 'views/home/Home'
import Login from 'views/login/Login'
import MenuBar from 'views/menu/MenuBar'
import QuizEditor from 'views/quizEditor/QuizEditor'
import QuizPage from 'views/quizPage/QuizPage'
import Results from 'views/results/Results'
import ResultsTable from 'views/resultsTable/ResultsTable'

import ErrorBar from 'components/errorBar/ErrorBar'
import LoadingBar from 'components/loadingBar/LoadingBar'

import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.background.contrastText,
  },
  viewsContainer: {
    padding: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },

}))

const ContentManager = () => {
  const classes = useStyles()
  const error = useSelector(state => state.error)
  return (
    <div className={classes.mainContainer}>
      <div style={{ flex: 1 }} />
      <div className={classes.viewsContainer}>
        <MenuBar />
        <Route exact path='/'><Home /></Route>
        <Route exact path='/login'><Login /></Route>
        <Route exact path='/quizEditor/:questionId?'><QuizEditor /></Route>
        <Route exact path='/quizPage/:questionId?'><QuizPage /></Route>
        <Route exact path='/results'><Results /></Route>
        <Route exact path='/resultsTable'><ResultsTable /></Route>
        <Footer />
        {Object.keys(error || {}).length > 0
          ? Object.values(error || {}).map(error => (
            <ErrorBar key={error.errorId} props={{ error }} />
          )) : null}
        <LoadingBar />
      </div>
      <div style={{ flex: 6 }} />
    </div>
  )
}

export default ContentManager
