import React from 'react';
import FindSubscriber from '../FindSubscriber/FindSubscriber';

import BackButton from '../BackButton/BackButton';

export default function SearchResult (props) {
    if (props.location.state == null) { return (
        <>
        <h1> Oops... Bad Search Query Please Click Search Again !! </h1>
        <BackButton label="Search Again" path="searchSubscriber"/>
       </>
    ); }
    const query = props.location.state.searchQuery;
    return (
       <>
        <FindSubscriber payload={query} />
        <BackButton label="Search Again"/>
        </>
    );
}