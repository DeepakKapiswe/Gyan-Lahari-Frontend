import React from 'react';
import useSWR from 'swr';

import SubscriberCardList from '../SubscriberCard/SubscriberCardList';
import SubscriberCard     from '../SubscriberCard/SubscriberCard';
import BackButton         from '../BackButton/BackButton';

let url = 'http://192.168.43.28:7000/expiryList/';

function ExpiredSubscribers(props) {
  const fetcher = (...args) => fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(props.payload)
  }).then(res => res.json())

  const { data, error} = useSWR(url, fetcher, { suspense: true });
  if (props.payload.eldDetails === '') { return null; }
  if (error) return <div>Failed to Load in Find Distributor Subscribers</div>
  if (!data) return <div>loading...</div>
  const items = data.elExpiries.map((item) => {
     item.isExpiring = true;
     return <SubscriberCard subscriberDetails={item}/>;
  });

  const expiryDetails = {
      expiryCount  : data.elExpiryCount
    , expiryVol    : data.elExpiryVol
    , expiryYearDuration : data.elExpiryYearDuration
  }
  const pdfData = {
      subscriberListData: data.elExpiries
    , distributorData: data.elDistributor
    , expiryDetails: expiryDetails
    , meta: 'ExpiryList' 
    };
    console.log(pdfData)
  return (
    <SubscriberCardList cards={items} header="Expiry List" pdfData={pdfData}/>
  );
}

export default function ExpiryList (props) {
    if (props.location.state == null) { return (
        <>
          <h1> Oops... Bad Query Please Go Back !! </h1>
          <BackButton/>
       </>
    ); }
    const eldDetails = props.location.state.eldDetails;
    const distDetails = props.location.state.distDetails;
    return (
       <>
         <ExpiredSubscribers payload={eldDetails} distDetails={distDetails} />
         <BackButton/>
       </>
    );
}

