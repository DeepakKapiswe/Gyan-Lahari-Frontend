import React from 'react';

import BackButton from '../BackButton/BackButton';
import RecentlyAddedSubscribers from '../RecentlyAdded/RecentlyAdded';

export default function RecentlyAddedResult (props) {
    if (props.location.state == null) { return (
        <>
        <h1> Oops... Bad Query Please Click View Again !! </h1>
        <BackButton label="View Again" path="/recentlyAddedForm"/>
       </>
    ); }
    const count = props.location.state.recentlyAddedQuery;
    return (
       <>
         <RecentlyAddedSubscribers payload={count} />
         <BackButton label="View Again"/>
       </>
    );
}