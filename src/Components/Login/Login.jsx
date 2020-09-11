import React from 'react';
import useSWR from 'swr';

import {url_login, url_distLogin} from '../../apiEndpoints/api';
import { useGotoRememberedLocation } from '../../Hooks/GotoRememberedLocation';
import { setLoggedIn } from '../../Library/Library';
import { useAuth } from '../../Hooks/AuthHooks';
import { useEffect } from 'react';
import { useDistributorLogin } from '../../Hooks/LoginHooks';

export default function Login(props) {
  const {movetoLastLocation, movetoNextLocation} = useGotoRememberedLocation();
  const {setUserType, setUserLoggedIn} = useAuth();
  const {setDistributorDetails} = useDistributorLogin();
  const url = props.payload.userRole === 'Distributor' ? url_distLogin : url_login;
  const fetcher = (...args) => fetch(url, {
   method: 'post',
    headers: {
      "Content-Type": "application/json",
      'Accept':  'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(props.payload)
  }).then(res => res.ok ? res.json() : res.status);

  const { data, error} = useSWR(url, fetcher, { suspense: true, refreshInterval: 99999999999999 , revalidateOnFocus: false });
  useEffect(() => {
    if (data === (null || 401 )) { movetoLastLocation(); }
    else if (data.hasOwnProperty('uType')) {
      setUserLoggedIn();
      setLoggedIn(data.uType, data.uId);
      setUserType(data.uType);
      movetoNextLocation ();
      }
    else if (data.hasOwnProperty('distId')) {
      setUserLoggedIn();
      setLoggedIn('UDistributor', data.distId);
      setUserType('UDistributor');
      setDistributorDetails(data);
      movetoNextLocation();
      }
  },[ data, 
      movetoLastLocation,
      movetoNextLocation,
      setUserType,
      setDistributorDetails,
      setUserLoggedIn ] );
  
  if (props.payload.userId === '') { return <h1>MSG : Props is null in Login User</h1>; }
  if (error) return <div>Failed to Load in Login User</div>
  return (
    data ? <h1>Valid User </h1> : <h1> NOT VALID USER </h1>
  );
}
