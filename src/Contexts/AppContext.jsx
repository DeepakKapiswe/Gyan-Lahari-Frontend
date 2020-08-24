import React from 'react'
const AppStateContext = React.createContext()
const AppDispatchContext = React.createContext()

function appReducer(state, action) {
  switch (action.cmd) {
    case 'setUserLoggedIn': {
      state.isUserLoggedIn = true
      return state
    }
    case 'unsetUserLoggedIn': {
      state.isUserLoggedIn = false
      return state
    }
    case 'setGotoLastLocation': {
      state.gotoLastLocation = true
      return state
    }
    case 'unsetGotoLastLocation': {
      state.gotoLastLocation = false
      return state
    }
    case 'saveLastLocation': {
      state.lastLocation = action.lastLocation
      return state
    }
    case 'saveNextLocation': {
      state.nextLocation.pathname = action.nextLocationPath
      state.nextLocation.state = action.nextLocationState
      return state
    }
    default: {
      throw new Error(`Unhandled action Command: ${action.cmd}`)
    }
  }
}

const initAppState = {
    isUserLoggedIn: false,
    gotoLastLocation: false,
    lastLocation:{pathname:'/', state : {}},
    nextLocation:{pathname:'/', state : {}},
}

function AppProvider({children}) {
  const [state, dispatch] = React.useReducer(appReducer, initAppState)
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}

function useAppState() {
  const context = React.useContext(AppStateContext)
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider')
  }
  return context
}

function useAppDispatch() {
  const context = React.useContext(AppDispatchContext)
  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppProvider')
  }
  return context
}

export {AppProvider, useAppState, useAppDispatch}