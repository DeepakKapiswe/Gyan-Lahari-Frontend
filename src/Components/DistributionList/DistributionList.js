import React from 'react';
import useSWR from 'swr';

import SubscriberCardList from '../SubscriberCard/SubscriberCardList';
import SubscriberCard from '../SubscriberCard/SubscriberCard';
import BackButton from '../BackButton/BackButton';

// let url = 'http://192.168.43.28:7000/distSubscribers/';
let url = 'http://192.168.43.28:7000/distributionList/';

function DistSubscribers(props) {
  const fetcher = (...args) => fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(props.payload)
  }).then(res => res.json())

  const { data, error} = useSWR(url, fetcher, { suspense: true });
  if (props.payload.dldDetails === '') { return null; }
  if (error) return <div>Failed to Load in Find Distributor Subscribers</div>
  if (!data) return <div>loading...</div>
  const chartVol = props.payload.dldCurrentVol;
  var expiryCount = 0;
  const items = data.map((item) => {
     item.isExpiring = item.subEndVol === chartVol;
     if (item.isExpiring) {expiryCount = expiryCount+1};
     return <SubscriberCard subscriberDetails={item}/>;
  });
  props.payload.expiryCount = expiryCount;
  const pdfData = {
      subscriberListData: data
    , distributorData: props.distDetails
    , distributionDetails: props.payload
    , meta: 'DistributionList' 
    };
  return (
    <SubscriberCardList cards={items} header="Distribution List" pdfData={pdfData}/>
  );
}

export default function DistributionList (props) {
    if (props.location.state == null) { return (
        <>
        <h1> Oops... Bad Query Please Go Back !! </h1>
        <BackButton/>
       </>
    ); }
    const dldDetails = props.location.state.dldDetails;
    const distDetails = props.location.state.distDetails;
    return (
       <>
        <DistSubscribers payload={dldDetails} distDetails={distDetails} />
        <BackButton/>
        </>
    );
}

