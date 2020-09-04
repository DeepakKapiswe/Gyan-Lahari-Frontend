import React from 'react'
import { getUserTypeLS, setUserTypeLS } from '../Library/Library'
const AppStateContext = React.createContext()
const AppDispatchContext = React.createContext()

function appReducer(state, action) {
  switch (action.cmd) {
    case 'setUserLoggedIn': {
      return {...state, isUserLoggedIn : true}
    }
    case 'unsetUserLoggedIn': {
      return {...state, isUserLoggedIn : false} 
    }
    case 'setGotoLastLocation': {
      return {...state, gotoLastLocation : true}
    }
    case 'unsetGotoLastLocation': {
      return {...state, gotoLastLocation : false}
    }
    case 'saveLastLocation': {
      return {...state, lastLocation : action.lastLocation}
    }
    case 'saveNextLocation': {
      state.nextLocation.pathname = action.nextLocationPath
      state.nextLocation.state = action.nextLocationState
      return state
    }
    case 'setUserType' : {
      setUserTypeLS(action.userType)
      return {...state, userType: action.userType }
    }
    default: {
      throw new Error(`Unhandled action Command: ${action.cmd}`)
    }
  }
}

const initAppState = {
    isUserLoggedIn: false,
    gotoLastLocation: false,
    userType: getUserTypeLS(),
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