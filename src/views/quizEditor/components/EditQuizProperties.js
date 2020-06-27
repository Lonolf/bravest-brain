import React, { useState, useEffect } from 'react'

import TextField from '@material-ui/core/TextField'

import translator from 'utility/translator'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'components/modal/Modal'

import * as actions from 'redux/actions'

const EditQuizProperties = ({ props: { modal, setModal } }) => {
  const quiz = useSelector(state => state.quiz)
  const [values, setValues] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    const { questions, ...quizValues } = quiz
    setValues({ ...quizValues })
  }, [quiz])

  const onClose = () => {
    dispatch({ type: actions.REDUCE_EDIT_QUIZ, payload: { ...quiz, ...values } })
    dispatch({ type: actions.EDIT_QUIZ, payload: { values } })
    setModal(false)
  }

  if (modal)
    return (
      <Modal onClose={onClose}>
        <TextField
          id='quizTitle'
          value={values.quizTitle}
          label={translator.fromLabel('quizEditor_quizTitle_label')}
          onChange={event => setValues({ ...values, quizTitle: event.target.value })}
          fullWidth
        />
        <TextField
          id='answersTime'
          value={values.answersTime}
          label={translator.fromLabel('quizEditor_answersTime_label')}
          onChange={event => setValues({ ...values, answersTime: event.target.value })}
          fullWidth
          type='number'
        />
      </Modal>
    )
  else
    return null
}

export default EditQuizProperties
