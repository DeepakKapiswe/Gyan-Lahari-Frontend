import { useAppState, useAppDispatch } from '../Contexts/AppContext';

function useUnsetGotoLastLocation () {
    const appDispatch = useAppDispatch();
    function unset () {
        appDispatch({cmd : 'unsetGotoLastLocation'});
    }

    return [unset]
}

export {useUnsetGotoLastLocation}

function useSetGotoLastLocation () {
    const appDispatch = useAppDispatch();
    function set () {
        appDispatch({cmd : 'setGotoLastLocation'});
    }

    return [set]
}

export {useSetGotoLastLocation}
