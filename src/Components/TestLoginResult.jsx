import React from 'react';
import TestLogin from './TestLogin';

import BackButton from './BackButton/BackButton';

export default function TestLoginResult (props) {
    if (props.location.state == null) { return (
        <>
        <h1> Oops... Bad Login Query Please Click Fill Details Again !! </h1>
        <BackButton label="Fill Details Again" path="searchSubscriber"/>
       </>
    ); }
    const userAuthData = props.location.state.userAuthData;
    return (
       <>
        <TestLogin payload={userAuthData} />
        <BackButton label="Fill Details Again"/>
       </>
    );
}