import React from 'react';

import BackButton from '../BackButton/BackButton';
import Login from '../Login/Login';

export default function LoginResult (props) {
    if (props.location.state == null) { return (
        <>
        <h1> Oops... Bad Login Query Please Click Fill Details Again !! </h1>
        <BackButton label="Fill Details Again" path="/patrika/searchSubscriber"/>
       </>
    ); }
    const userAuthData = props.location.state.userAuthData;
    return (
       <>
        <Login payload={userAuthData} />
        <BackButton label="Fill Details Again"/>
       </>
    );
}