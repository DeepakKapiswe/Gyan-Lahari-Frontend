import React from 'react';
import useSWR from 'swr';

import {url_login} from '../../apiEndpoints/api';
import { useGotoRememberedLocation } from '../../Hooks/GotoRememberedLocation';
import { setLoggedIn } from '../../Library/Library';
import { useAuth } from '../../Hooks/AuthHooks';
import { useEffect } from 'react';


let url = url_login;

export default function Login(props) {
  const {movetoLastLocation, movetoNextLocation} = useGotoRememberedLocation();
  const {setUserType} = useAuth();
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
    if (data.hasOwnProperty('uType')) {
      setLoggedIn(data);
      setUserType(data.uType);
      movetoNextLocation ();
      }
    if (data === null ) { movetoLastLocation(); }
  },[data, movetoLastLocation, movetoNextLocation, setUserType] );
  
  if (props.payload.userId === '') { return <h1>MSG : Props is null in Login User</h1>; }
  if (error) return <div>Failed to Load in Login User</div>
  return (
    data ? <h1>Valid User </h1> : <h1> NOT VALID USER </h1>
  );
}
