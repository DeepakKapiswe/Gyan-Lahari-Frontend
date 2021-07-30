import React, { Suspense } from 'react';
import BackButton from '../BackButton/BackButton';
import AddSubscriberResult from '../AddSubscriber/AddSubscriber';
import { LinearProgress } from '@material-ui/core';
import ButtonRouter from '../../Common/ButtonRouter';
import RenewSubscriptionResult from '../RenewSubscription/RenewSubscription';

export default function RenewResult (props) {
    if (props.location.state == null) { return (
        <>
        <h1> Oops... You Visited Wrong Place Please Click Go To Home </h1>
        <BackButton label="Go To Home" path="/patrika/"/>
       </>
    ); }
    const renewalData=props.location.state.renewalData;
    return (
       <>
        <Suspense fallback={<LinearProgress/>}>
            <RenewSubscriptionResult renewalData={renewalData}/>
        </Suspense>
        <BackButton />
       </>
    );
}