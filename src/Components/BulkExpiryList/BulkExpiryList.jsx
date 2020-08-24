import React from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

import SubscriberCardList from '../SubscriberCard/SubscriberCardList';
import BackButton from '../BackButton/BackButton';
import { url_bulkExpiryList } from '../../apiEndpoints/api';
import LoginPrompt from '../LoginPrompt/LoginPrompt';

let url = url_bulkExpiryList;

function FetchBulkExpiryList(props) {
  const fetcher = (...args) => fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
      'Accept':  'application/json',
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || "ERROR : XSRF TOKEN NOT FOUND",
    },
    body: JSON.stringify(props.payload)
  }).then(res => res.ok ? res.json() : res.status);

  const { data, error} = useSWR(url, fetcher, { suspense: true });
  if (props.payload.beldDetails === '') { return null; }
  if (error) return <div>Failed to Load in Bulk Expiry List</div>
  if (!data) return <div>loading...</div>
  if (data === 401) return <LoginPrompt/>

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

