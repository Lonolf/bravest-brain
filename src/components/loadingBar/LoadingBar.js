import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import { useSelector } from 'react-redux'

const LoadingBar = () => {
  const loading = useSelector(state => state.loading)

  return (loading || []).length > 0 && (
    <CircularProgress
      variant='indeterminate'
      size={75}
      style={{
        position: 'fixed',
        bottom: 25,
        right: 25,
        zIndex: 2000,
      }}
    />
  )
}

export default LoadingBar
