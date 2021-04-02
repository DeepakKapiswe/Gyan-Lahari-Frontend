import React from 'react';

import BackButton from '../BackButton/BackButton';
import FilterSubscribers from '../FilterSubscriber/FilterSubscriber';

export default function FilterResult (props) {
    if (props.location.state == null) { return (
        <>
          <h1> Oops... Bad Filter Query Please Click Filter Again !! </h1>
          <BackButton label="Filter Again" path="/patrika/filterForm"/>
       </>
    ); }
    const filterOptions = props.location.state.filterOptions;
    // we need to change the property names to mach backend's type
    const data = {
       foSubId : filterOptions.subId,
       foSubName : filterOptions.subName,
       foSubAbout : filterOptions.subAbout,
       foSubAdd1 : filterOptions.subAdd1,
       foSubAdd2 : filterOptions.subAdd2,
       foSubPost : filterOptions.subPost,
       foSubCity : filterOptions.subCity,
       foSubState : filterOptions.subState,
       foSubPincode : filterOptions.subPincode,
       foSubPhone : filterOptions.subPhone,
       foSubRemark : filterOptions.subRemark,
       foSubDistId : filterOptions.subDistId,
    }
    // special care for Integer fields
    if (filterOptions.subStartVol !== undefined)
         {data.foSubStartVol = filterOptions.subStartVol.map(v => v*1)}
    if (filterOptions.subSubscriptionType !== undefined)
         {data.foSubSubscriptionType = filterOptions.subSubscriptionType.map(v => v*1)}
    if (filterOptions.subSlipNum !== undefined)
         {data.foSubSlipNum = filterOptions.subSlipNum.map(v => v*1)}
    if (filterOptions.subEndVol !== undefined)
         {data.foSubEndVol = filterOptions.subEndVol.map(v => v*1)}
    return (
       <>
        <FilterSubscribers payload={data} />
        <BackButton label="Filter Again"/>
       </>
    );
}