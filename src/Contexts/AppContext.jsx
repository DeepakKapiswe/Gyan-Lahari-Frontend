import React from 'react'
import { getUserTypeLS, setUserTypeLS, getDistributorLS, setDistributorLS, setLoggedOut, isLoggedIn } from '../Library/Library'
const AppStateContext = React.createContext()
const AppDispatchContext = React.createContext()

function appReducer(state, action) {
  switch (action.cmd) {
    case 'clearContext': {
      state = initAppState;
      return state;
    }
    case 'setUserLoggedIn': {
      return {...state, isUserLoggedIn : true}
    }
    case 'unsetUserLoggedIn': {
      setLoggedOut();
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
      setUserTypeLS(action.userType);
      return {...state, userType: action.userType }
    }
    case 'setDistributorDetails' : {
      setDistributorLS(action.distributorDetails);
      return {...state, distributorDetails: action.distributorDetails }
    }
    default: {
      throw new Error(`Unhandled action Command: ${action.cmd}`)
    }
  }
}

const initAppState = {
    isUserLoggedIn: isLoggedIn(),
    gotoLastLocation: false,
    userType: getUserTypeLS(),
    distributorDetails: getDistributorLS(), 
    lastLocation:{pathname:'/patrika/', state : {}},
    nextLocation:{pathname:'/patrika/', state : {}},
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