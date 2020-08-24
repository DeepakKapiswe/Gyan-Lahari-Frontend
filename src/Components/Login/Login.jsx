import React from 'react';
import useSWR from 'swr';

import {url_login} from '../../apiEndpoints/api';
import { useGotoRememberedLocation } from '../../Hooks/GotoRememberedLocation';
import { setLoggedIn } from '../../Library/Library';


let url = url_login;

export default function Login(props) {
  const {movetoLastLocation, movetoNextLocation} = useGotoRememberedLocation();
  const fetcher = (...args) => fetch(url, {
   method: 'post',
    headers: {
      "Content-Type": "application/json",
      'Accept':  'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(props.payload)
  })

  const { data, error} = useSWR(url, fetcher, { suspense: true,revalidateOnFocus: false });
  if (props.payload.userId === '') { return null; }
  if (error) return <div>Failed to Load in Login User</div>
  // #1 for authenticated user
  // have to edit here depending on the value of data returned 
  // we should decide whether authenticated or not
  if (data !== null ) { setLoggedIn(); movetoNextLocation ();}
    else { movetoLastLocation();}
  return (
    data ? <h1>Valid User </h1> : <h1> NOT VALID USER </h1>
  );
}