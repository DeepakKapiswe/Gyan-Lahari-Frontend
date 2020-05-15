import React from 'react';
import useSWR from 'swr';

import SubscriberCardList from '../SubscriberCard/SubscriberCardList';
import BackButton from '../BackButton/BackButton';

let url = 'http://192.168.43.28:7000/bulkDistributionList/';

function FetchBulkDistributionList(props) {
  const fetcher = (...args) => fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(props.payload)
  }).then(res => res.json())

  const { data, error} = useSWR(url, fetcher, { suspense: true });
  if (props.payload.bdldDetails === '') { return null; }
  if (error) return <div>Failed to Load in Bulk Distribution List</div>
  if (!data) return <div>loading...</div>

  const pdfData = {
      bulkDistributionData : data
    , meta: 'BulkDistributionList' 
    };
  return (
    <SubscriberCardList cards={[]} header="Bulk Distribution List" pdfData={pdfData}/> );
}

export default function BulkDistributionList (props) {
    if (props.location.state == null) { return (
        <>
        <h1> Oops... Bad Query Please Go Back !! </h1>
        <BackButton/>
       </>
    ); }
    const bdldDetails = props.location.state.bdldDetails;
    return (
       <>
        <h1>Distribution List Successfully Generated !! </h1>
        <FetchBulkDistributionList payload={bdldDetails} />
        <BackButton/>
      </>
    );
}

