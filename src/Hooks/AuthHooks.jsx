import { useAppDispatch, useAppState } from "../Contexts/AppContext";
import { useCallback } from "react";

function useAuth() {
    const appDispatch = useAppDispatch();
    const {userType, isUserLoggedIn} = useAppState();
    const setUserType = useCallback ((userType1) => {
        appDispatch({ cmd: 'setUserType', userType : userType1 });
    }, [appDispatch]);
    const setUserLoggedIn = useCallback (() => {
        appDispatch({ cmd: 'setUserLoggedIn'});
    }, [appDispatch]);
    const setUserLoggedOut = useCallback (() => {
        appDispatch({ cmd: 'unsetUserLoggedIn'});
    }, [appDispatch]);
    return {
      setUserType,
      userType,
      setUserLoggedIn,
      isUserLoggedIn,
      setUserLoggedOut
      }

}

export { useAuth }
