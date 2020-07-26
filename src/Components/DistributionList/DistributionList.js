import React from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

import SubscriberCardList from '../SubscriberCard/SubscriberCardList';
import SubscriberCard     from '../SubscriberCard/SubscriberCard';
import BackButton         from '../BackButton/BackButton';
import { url_bulkDistributionList } from '../../apiEndpoints/api';

let url = url_bulkDistributionList;

function DistSubscribers(props) {
  const fetcher = (...args) => fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
      'Accept':  'application/json',
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || "ERROR : XSRF TOKEN NOT FOUND",
    },
    body: JSON.stringify(props.payload)
  }).then(res => res.json())

  const { data, error} = useSWR(url, fetcher, { suspense: true });
  if (props.payload.dldDetails === '') { return null; }
  if (error) return <div>Failed to Load in Find Distributor Subscribers</div>
  if (!data) return <div>loading...</div>
  const items = data.dlSubscriberList.map((item) => {
     item.isExpiring = item.subEndVol === data.dlCurrentVol;
     return <SubscriberCard subscriberDetails={item}/>;
  });

  const distributionDetails = {
      expiryCount  : data.dlExpiryCount
    , runningCount : data.dlRunningCount
    , currentVol   : data.dlCurrentVol
    , expiries     : data.dlExpiries
  }
  const pdfData = {
      subscriberListData: data.dlSubscriberList
    , distributorData: data.dlDistributor
    , distributionDetails: distributionDetails
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

