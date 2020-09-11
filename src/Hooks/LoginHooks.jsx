import { useAppDispatch } from "../Contexts/AppContext";
import { useCallback } from "react";

function useDistributorLogin() {
    const appDispatch = useAppDispatch();
    const setDistributorDetails = useCallback ((data) => {
        appDispatch({ cmd: 'setDistributorDetails', distributorDetails : data });
    }, [appDispatch]);
    return {setDistributorDetails}

}

export { useDistributorLogin }
