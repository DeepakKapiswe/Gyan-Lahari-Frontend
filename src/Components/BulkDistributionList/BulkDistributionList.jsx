import React from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

import SubscriberCardList from '../SubscriberCard/SubscriberCardList';
import BackButton from '../BackButton/BackButton';
import { url_bulkDistributionList } from '../../apiEndpoints/api';
import LoginPrompt from '../LoginPrompt/LoginPrompt';

let url = url_bulkDistributionList;

function FetchBulkDistributionList(props) {
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
  if (props.payload.bdldDetails === '') { return null; }
  if (error) return <div>Failed to Load in Bulk Distribution List</div>
  if (!data) return <div>loading...</div>
  if (data === 401) return <LoginPrompt/>

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

