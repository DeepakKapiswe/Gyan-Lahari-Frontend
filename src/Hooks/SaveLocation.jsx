import { useLocation } from '@reach/router';
import { useAppDispatch } from '../Contexts/AppContext';



function useSaveLastLocation() {
    const location = useLocation();
    const appDispatch = useAppDispatch();
    return (path, state) => {
        location.pathname = path || location.pathname;
        location.state = state || location.state;
        appDispatch({ cmd: 'saveLastLocation', lastLocation: location });
        appDispatch({ cmd: 'setGotoLastLocation' });
}
}

export { useSaveLastLocation }

function useSaveNextLocation() {
    const location = useLocation();
    const appDispatch = useAppDispatch();
    return (pathname, state) => {
        pathname = pathname || location.pathname;
        state = state || location.state;
        appDispatch({ cmd: 'saveNextLocation', 
                      nextLocationPath: pathname, 
                      nextLocationState : state 
                    });
    }
}

export { useSaveNextLocation }
