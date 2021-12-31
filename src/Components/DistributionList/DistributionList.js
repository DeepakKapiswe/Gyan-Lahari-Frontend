import React from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

import SubscriberCardList from '../SubscriberCard/SubscriberCardList';
import SubscriberCard     from '../SubscriberCard/SubscriberCard';
import BackButton         from '../BackButton/BackButton';
import { url_distributionList, url_distDistributionList } from '../../apiEndpoints/api';
import LoginPrompt from '../LoginPrompt/LoginPrompt';
import { useAppState } from '../../Contexts/AppContext';


function DistSubscribers(props) {
  const {userType} = useAppState();
  const url = userType === 'UDistributor' ? url_distDistributionList : url_distributionList ;
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
  if (props.payload.dldDetails === '') { return null; }
  if (error) return <div>Failed to Load in Find Distributor Subscribers</div>
  if (!data) return <div>loading...</div>
  if (data === 401) return <LoginPrompt/>
  const items = data.dlSubscriberList.map((item) => {
     item.isExpiring = item.subEndVol === data.dlCurrentVol && item.upcomingPlans === null;
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

