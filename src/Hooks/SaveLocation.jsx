import { useLocation } from '@reach/router';
import { useAppDispatch } from '../Contexts/AppContext';
import { isLoggedIn } from '../Library/Library';



function useSaveLastLocation() {
    const location = useLocation();
    const appDispatch = useAppDispatch();
    return () => {
        if (!isLoggedIn()) {
        appDispatch({ cmd: 'saveLastLocation', lastLocation: location });
        appDispatch({ cmd: 'setGotoLastLocation' });
    }}
}

export { useSaveLastLocation }

function useSaveNextLocation() {
    const appDispatch = useAppDispatch();
    return (pathname, state) => {
        if (!isLoggedIn()) {
        appDispatch({ cmd: 'saveNextLocation', 
                      nextLocationPath: pathname, 
                      nextLocationState : state 
                    });
    }}
}

export { useSaveNextLocation }
