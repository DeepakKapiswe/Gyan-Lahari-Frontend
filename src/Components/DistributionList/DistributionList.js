import React from 'react';
import useSWR from 'swr';

import SubscriberCardList from '../SubscriberCard/SubscriberCardList';
import SubscriberCard from '../SubscriberCard/SubscriberCard';
import BackButton from '../BackButton/BackButton';

let url = 'http://192.168.43.28:7000/distSubscribers/';

function DistSubscribers(props) {
  const fetcher = (...args) => fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(props.payload)
  }).then(res => res.json())

  const { data, error} = useSWR(url, fetcher, { suspense: true });
  if (props.payload.dI === '') { return null; }
  if (error) return <div>Failed to Load in Find Distributor Subscribers</div>
  if (!data) return <div>loading...</div>
  const items = data.map((item) => <SubscriberCard subscriberDetails={item} />);
  return (
    <SubscriberCardList cards={items} header="Distribution List" pdfData={data}/>
  );
}

export default function DistributionList (props) {
    if (props.location.state == null) { return (
        <>
        <h1> Oops... Bad Query Please Go Back !! </h1>
        <BackButton/>
       </>
    ); }
    const dD = props.location.state.distributor;
    return (
       <>
        <DistSubscribers payload={dD} />
        <BackButton/>
        </>
    );
}