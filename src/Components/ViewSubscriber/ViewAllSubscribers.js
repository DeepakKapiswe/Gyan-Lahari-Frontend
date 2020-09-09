import React from 'react';
import useSWR from 'swr'
import Cookies from 'js-cookie';

import SubscriberCard from '../SubscriberCard/SubscriberCard';
import SubscriberCardList from '../SubscriberCard/SubscriberCardList';
import { url_getAllSubscribers, url_distGetAllSubscribers } from '../../apiEndpoints/api';
import LoginPrompt from '../LoginPrompt/LoginPrompt';
import { useSaveNextLocation } from '../../Hooks/SaveLocation';
import { useLocation } from '@reach/router';
import { useAppState } from '../../Contexts/AppContext';


export default function ViewAllSubscribers(props) {
  const saveNextLocation = useSaveNextLocation();
  const location = useLocation();
  saveNextLocation(location.pathname,{state:{}})
  const {userType} = useAppState();
  const url = userType === 'UDistributor' ? url_distGetAllSubscribers : url_getAllSubscribers;
  const fetcher = (...args) => fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Accept':  'application/json',
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || "ERROR : XSRF TOKEN NOT FOUND",
    },
    credentials: 'include',
    body: JSON.stringify(props.payload)
  }).then(res => res.ok ? res.json() : res.status);

  const { data, error} = useSWR(url, fetcher, { suspense: true });
  if (error) return <div> Some Error occured while fetching data </div>
  if (!data) return <div>loading...</div>
  if (data === 401) return <LoginPrompt/>
  const jsonData = data;
  const items = jsonData.map((item) => <SubscriberCard subscriberDetails={item}/>);
  const pdfData ={subscriberListData: jsonData, meta : 'AllSubscribers'} 
  return <SubscriberCardList cards={items} header="All Subscribers" pdfData={pdfData}/>;
}
