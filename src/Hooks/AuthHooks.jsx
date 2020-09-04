import { useAppDispatch, useAppState } from "../Contexts/AppContext";
import { useCallback } from "react";

function useAuth() {
    const appDispatch = useAppDispatch();
    const {userType} = useAppState();
    const setUserType = useCallback ((userType1) => {
        appDispatch({ cmd: 'setUserType', userType : userType1 });
    }, [appDispatch]);
    return {setUserType, userType}

}

export { useAuth }
