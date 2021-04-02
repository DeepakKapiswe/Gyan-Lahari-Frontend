import React from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

import { url_subViewSubscriber } from '../../apiEndpoints/api';
import LoginPrompt from '../LoginPrompt/LoginPrompt';
import SubscriberDetails from '../SubscriberDetails/SubscriberDetails';
import { useSaveLastLocation, useSaveNextLocation } from '../../Hooks/SaveLocation';

let url = url_subViewSubscriber;

export default function SubscriberDashboard (props) {
  const saveLastLocation = useSaveLastLocation();
  const saveNextLocation = useSaveNextLocation();
  const fetcher = (...args) => fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Accept':  'application/json',
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || "ERROR : XSRF TOKEN NOT FOUND",
    },
    credentials: 'include',
  }).then(res => res.ok ? res.json() : res.status);
  saveLastLocation("/patrika/");
  saveNextLocation("/patrika/subscriberDashboard");
  

  const { data, error} = useSWR(url, fetcher, { suspense: true });
  if (error) return <div> Some Error occured while fetching data </div>
  if (!data) return <div>loading...</div>
  if (data === 401) return <LoginPrompt/>

  const subData = data[0];
  return (
    <>
      {data && <SubscriberDetails subscriber={subData} />}
    </> );
}
