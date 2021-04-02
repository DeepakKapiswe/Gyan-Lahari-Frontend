import React from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

import { url_distViewDistributor } from '../../apiEndpoints/api';
import LoginPrompt from '../LoginPrompt/LoginPrompt';
import { useSaveLastLocation, useSaveNextLocation } from '../../Hooks/SaveLocation';
import DistributorDetails from '../DistributorDetails/DistributorDetails';

let url = url_distViewDistributor;

export default function FetchDistributorDashboard (props) {
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
  saveNextLocation("/patrika/distributorDashboard");


  const { data, error} = useSWR(url, fetcher, { suspense: true });
  if (error) return <div> Some Error occured while fetching data </div>
  if (!data) return <div>loading...</div>
  if (data === 401) return <LoginPrompt/>

  const distData = data[0];
  return (
    <>
      {distData && <DistributorDetails distributor={distData} />}
    </> );
}
