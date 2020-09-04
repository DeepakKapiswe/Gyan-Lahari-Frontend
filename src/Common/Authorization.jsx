import { useAuth } from '../Hooks/AuthHooks';
import { isAuthorized } from '../Library/Library';
import { useEffect } from 'react';

export function Authorised (props) {
    const {userType} = useAuth();
    useEffect (() => {
    },[userType]);
    if (isAuthorized(userType, props.authUserTypes)) {return props.children;}
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
export const ualDistributor = ['UDistributor','UManager', 'UApprover', 'UAdmin'];
export const ualManager = ['UManager', 'UApprover', 'UAdmin'];
export const ualApprover = ['UApprover', 'UAdmin'];

