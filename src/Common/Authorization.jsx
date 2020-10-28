import { useAuth } from '../Hooks/AuthHooks';
import { isAuthorized } from '../Library/Library';
import { useEffect } from 'react';
import { useState } from 'react';

export function Authorised (props) {
    const {userType} = useAuth();
    const [authStatus, setAuthStatus] = useState(isAuthorized(userType, props.authUserTypes));
    useEffect (() => {
        setAuthStatus(isAuthorized(userType, props.authUserTypes));
    },[userType, props.authUserTypes]);
    if (authStatus) {return props.children;}
    return props.fallback;
};

Authorised.defaultProps = {
    fallback: null,
    authUserTypes: ['UAdmin']
};


export const uts = ['USubscriber'];
export const utd = ['UDistributor'];
export const utm = ['UManager'];
export const utap = ['UApprover'];
export const ualSubscriber = ['USubscriber','UDistributor','UManager', 'UApprover', 'UAdmin'];
export const ualDistributor = ['UDistributor','UManager', 'UApprover', 'UAdmin'];
export const ualManager = ['UManager', 'UApprover', 'UAdmin'];
export const ualApprover = ['UApprover', 'UAdmin'];

