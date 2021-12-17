import React from 'react';

import BackButton from '../BackButton/BackButton';
import DistSubscribers from '../DistSubscribers/DistSubscribers';

export default function DistSubscribersResult (props) {
    if (props.location.state == null) { return (
        <>
        <h1> Oops... Bad Query Please Click View Again !! </h1>
        <BackButton label="View Again" path="/patrika/distSubscribersForm"/>
       </>
    ); }
    const distId = props.location.state.distId || 32; 
    return (
       <>
         <DistSubscribers payload={distId} />
         <BackButton label="View Again"/>
       </>
    );
}