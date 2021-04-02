import React from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

import DistributorCard from '../DistributorCard/DistributorCard';
import DistributorCardList from '../DistributorCard/DistributorCardList';
import { url_getAllDistributor } from '../../apiEndpoints/api';
import LoginPrompt from '../LoginPrompt/LoginPrompt';
import { useSaveNextLocation } from '../../Hooks/SaveLocation';
import { useLocation } from '@reach/router';

export default function ViewAllDistributors(props) {
  let url = url_getAllDistributor;
  const saveNextLocation = useSaveNextLocation();
  const location = useLocation();
  saveNextLocation(location.pathname,{state:{}})

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
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  if (data === 401) return <LoginPrompt/>
  const sortedData = data.sort((a,b) => a.distId-b.distId);
  const items = sortedData.map((item) => <DistributorCard distributorDetails={item}/>);
  return <DistributorCardList cards={items}/>;
}
