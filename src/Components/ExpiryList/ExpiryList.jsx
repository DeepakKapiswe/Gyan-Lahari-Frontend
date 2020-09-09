import React from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

import SubscriberCardList from '../SubscriberCard/SubscriberCardList';
import SubscriberCard     from '../SubscriberCard/SubscriberCard';
import BackButton         from '../BackButton/BackButton';
import { url_expiryList, url_distExpiryList } from '../../apiEndpoints/api';
import LoginPrompt from '../LoginPrompt/LoginPrompt';
import { useAppState } from '../../Contexts/AppContext';

let url = url_expiryList;

function ExpiredSubscribers(props) {
  const {userType} = useAppState();
  const url = userType === 'UDistributor' ? url_distExpiryList : url_expiryList ;
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
  if (props.payload.eldDetails === '') { return null; }
  if (error) return <div>Failed to Load in Find Distributor Subscribers</div>
  if (!data) return <div>loading...</div>
  if (data === 401) return <LoginPrompt/>
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

