import React, { useState, useEffect, useContext } from 'react'

const SizeContext = React.createContext(false)

const SizeSwitcher = ({ children }) => {
  const [state, setState] = useState({ mobile: false, height: 800 })
  const handleResize = () => {
    setState({ mobile: window.innerWidth <= 600, height: window.innerHeight })
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <SizeContext.Provider value={state}>
      {children}
    </SizeContext.Provider>
  )
}

export const useSize = () => useContext(SizeContext)

export default SizeSwitcher
