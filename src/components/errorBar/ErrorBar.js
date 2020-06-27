import React, { useEffect } from 'react'

import Snackbar from '@material-ui/core/Snackbar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'
import { useTheme } from '@material-ui/core/styles'
// redux
import { useDispatch } from 'react-redux'
import * as actions from 'redux/actions'

const ErrorBar = ({
  props: { onClose = () => {}, error, error: { errorId, message } },
}) => {
  const dispatch = useDispatch()
  const theme = useTheme()

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval)
      dispatch({ type: actions.REDUCE_DELETE_ERROR, payload: { error } })
    }, 10000)

    return () => clearInterval(interval)
    // eslint-disable-next-line
  }, [])

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open
      autoHideDuration={5000}
      onClose={onClose}
      message={(
        <Toolbar style={{ minHeight: 0 }} disableGutters>
          <ErrorIcon style={{ marginRight: 15 }} />
          <span id='message-id'>
            {JSON.stringify(message)}
          </span>
        </Toolbar>
      )}
      ContentProps={{
        'aria-describedby': 'message-id',
        style: { backgroundColor: theme.palette.error.main },
      }}
      action={[
        <Button
          key='close'
          aria-label='Close'
          color='inherit'
          onClick={() => dispatch({ type: actions.REDUCE_DELETE_ERROR, payload: { error } })}
        >
          <CloseIcon />
        </Button>,
      ]}
    />
  )
}

export default ErrorBar
