import React from 'react';
import FindSubscriberResult from '../FindSubscriber/FindSubscriber';

import BackButton from '../BackButton/BackButton';

export default function SearchResult (props) {
    const query = props.location.state.searchQuery;
    // console.log();
    return (
       <>
        <FindSubscriberResult payload={query} />
        <BackButton label="Search Again"/>
        </>
    );
}