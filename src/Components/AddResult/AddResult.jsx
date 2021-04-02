import React, { Suspense } from 'react';

import BackButton from '../BackButton/BackButton';
import AddSubscriberResult from '../AddSubscriber/AddSubscriber';
import { LinearProgress } from '@material-ui/core';
import ButtonRouter from '../../Common/ButtonRouter';

export default function AddResult (props) {
    if (props.location.state == null) { return (
        <>
        <h1> Oops... You Visited Wrong Place Please Click Add New Subscriber!! </h1>
        <BackButton label="Add New Subscriber" path="/patrika/addNewSubscriber"/>
       </>
    ); }
    const newSubscriberData = props.location.state.newSubscriberData;
    return (
       <>
        <Suspense fallback={<LinearProgress/>}>

        <AddSubscriberResult newSubscriberData={newSubscriberData}/>
        </Suspense>
        <ButtonRouter route="/patrika/addNewSubscriber" label="Add More" />
       </>
    );
}