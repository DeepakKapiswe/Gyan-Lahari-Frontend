import React from 'react';

import BackButton from '../BackButton/BackButton';
import FilterSubscribers from '../FilterSubscriber/FilterSubscriber';

export default function FilterResult (props) {
    if (props.location.state == null) { return (
        <>
        <h1> Oops... Bad Filter Query Please Click Filter Again !! </h1>
        <BackButton label="Filter Again" path="filterForm"/>
       </>
    ); }
    const filterOptions = props.location.state.filterOptions;
    return (
       <>
        <FilterSubscribers payload={filterOptions} />
        <BackButton label="Filter Again"/>
       </>
    );
}