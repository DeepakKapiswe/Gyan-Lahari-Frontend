import React from 'react';
import useSWR from 'swr';

import SubscriberCardList from '../SubscriberCard/SubscriberCardList';
import BackButton from '../BackButton/BackButton';

let url = 'http://192.168.43.28:7000/bulkExpiryList/';

function FetchBulkExpiryList(props) {
  const fetcher = (...args) => fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(props.payload)
  }).then(res => res.json())

  const { data, error} = useSWR(url, fetcher, { suspense: true });
  if (props.payload.beldDetails === '') { return null; }
  if (error) return <div>Failed to Load in Bulk Expiry List</div>
  if (!data) return <div>loading...</div>

  const pdfData = {
      bulkExpiryListData : data
    , meta: 'BulkExpiryList' 
    };
  return (
    <SubscriberCardList cards={[]} header="Bulk Expiry List" pdfData={pdfData}/> );
}

export default function BulkExpiryList (props) {
    if (props.location.state == null) { return (
       <>
        <h1> Oops... Bad Query Please Go Back !! </h1>
        <BackButton/>
       </>
    ); }
    const beldDetails = props.location.state.beldDetails;
    return (
       <>
        <h1>Expiry List Successfully Generated !! </h1>
        <FetchBulkExpiryList payload={beldDetails} />
        <BackButton/>
      </>
    );
}

