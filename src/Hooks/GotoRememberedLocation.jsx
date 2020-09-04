import { useNavigate } from '@reach/router';
import { useAppState, useAppDispatch } from '../Contexts/AppContext';
import { useCallback } from 'react';


function useGotoRememberedLocation () {
    const navigate = useNavigate();
    const {lastLocation, gotoLastLocation, nextLocation } = useAppState();
    const appDispatch = useAppDispatch();
    const flag = gotoLastLocation;

    const movetoLastLocation = useCallback( () => {
        appDispatch({cmd : 'unsetGotoLastLocation'});
        if (flag === true) navigate(lastLocation.pathname);
        },[appDispatch, navigate, flag, lastLocation]);
    
    const movetoNextLocation = useCallback( () => {
        appDispatch({cmd : 'unsetGotoLastLocation'});
        if (flag === true) navigate(nextLocation.pathname, nextLocation.state);
    }, [appDispatch, navigate, flag, nextLocation]);

    return {movetoLastLocation, movetoNextLocation}
}

export { useGotoRememberedLocation }