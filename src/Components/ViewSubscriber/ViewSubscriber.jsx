import React from 'react';
import SubscriberDetails from '../SubscriberDetails/SubscriberDetails';
import ButtonRouter from '../../common/ButtonRouter';

export default function SearchResult (props) {
    if (props.location.state == null) { return (
       <>
        <h1> Oops... Something Went Wrong Please Add New Subscriber !! </h1>
        <ButtonRouter route="/patrika/addNewSubscriber" label="Add New Subscriber" />
       </>
    ); }
    const subscriber = props.location.state.subscriber;
    return (
       <>
        <SubscriberDetails subscriber={subscriber} />
        <ButtonRouter route="/patrika/addNewSubscriber" label="Add New Subscriber" />
       </>
    );
}