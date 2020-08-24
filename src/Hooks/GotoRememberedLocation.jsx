import { useNavigate } from '@reach/router';
import { useAppState, useAppDispatch } from '../Contexts/AppContext';


function useGotoRememberedLocation () {
    const navigate = useNavigate();
    const {lastLocation, gotoLastLocation, nextLocation } = useAppState();
    const appDispatch = useAppDispatch();
    const flag = gotoLastLocation;

    function movetoLastLocation () {
        appDispatch({cmd : 'unsetGotoLastLocation'});
        if (flag === true) navigate(lastLocation.pathname);
    }
    
    function movetoNextLocation () {
        appDispatch({cmd : 'unsetGotoLastLocation'});
        if (flag === true) navigate(nextLocation.pathname, nextLocation.state);
    }

    return {movetoLastLocation, movetoNextLocation}
}

export { useGotoRememberedLocation }