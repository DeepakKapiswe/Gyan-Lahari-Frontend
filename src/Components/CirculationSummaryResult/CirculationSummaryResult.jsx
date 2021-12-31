import React from 'react';

import BackButton from '../BackButton/BackButton';
import CirculationSummary from '../CirculationSummary/CirculationSummary';

export default function CirculationSummaryResult (props) {
    if (props.location.state == null) { return (
        <>
        <h1> Oops... Bad Query Please Click View Again !! </h1>
        <BackButton label="View Again" path="/patrika/circulationSummaryForm"/>
       </>
    ); }
    const issueNum = props.location.state.circulationSummaryQuery;
    return (
       <>
         <CirculationSummary payload={issueNum} />
         <BackButton label="View Again"/>
       </>
    );
}