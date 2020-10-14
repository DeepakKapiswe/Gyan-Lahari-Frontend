import React from 'react';
import useSWR from 'swr';

import {url_logout} from '../../apiEndpoints/api';
import { setLoggedOut } from '../../Library/Library';
import { useEffect } from 'react';
import { navigate, Redirect } from '@reach/router';
import { useAppDispatch } from '../../Contexts/AppContext';
import { useGotoRememberedLocation } from '../../Hooks/GotoRememberedLocation';

export default function Login(props) {
  const url = url_logout;
  const appDispatch = useAppDispatch();
  const {movetoLastLocation} = useGotoRememberedLocation();
  const fetcher = (...args) => fetch(url, {
   method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Accept':  'application/json',
    },
    credentials: 'include',
  }).then(res => res.ok ? res.json() : res.status);

  const { data, error} = useSWR(url, fetcher, { suspense: true, refreshInterval: 99999999999999 , revalidateOnFocus: false });
  useEffect(() => {
    if (data === null ) { 
      movetoLastLocation(); 
      } else {
    setLoggedOut();
    localStorage.clear();
    appDispatch({ cmd: 'clearContext'});
    navigate("/");
  }}, [data, movetoLastLocation, appDispatch]);
  if (error) return <div>Failed to Load in Logout User</div>
  return (
    <Redirect default from="/*" to="/" noThrow />
    // <h1> {data} </h1>
    );
}
