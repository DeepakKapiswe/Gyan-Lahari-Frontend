import React from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

import { url_viewCurrentVolumeNum } from '../../apiEndpoints/api';
import LoginPrompt from '../LoginPrompt/LoginPrompt';
import { useSaveLastLocation, useSaveNextLocation } from '../../Hooks/SaveLocation';

let url = url_viewCurrentVolumeNum;

export default function ViewCurrentVolumeNum (props) {
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
  saveNextLocation("/patrika/viewCurrentVolume");
  

  const { data, error} = useSWR(url, fetcher, { suspense: true });
  if (error) return <div> Some Error occured while fetching data </div>
  if (!data) return <div>loading...</div>
  if (data === 401) return <LoginPrompt/>
  return (
    <>
      {data && <DisplayCurrentVol currentVolumeNum={data} />}
    </> );
}


function DisplayCurrentVol (props) {
  return (
    <h2> Current Issue Number is :  {props.currentVolumeNum} </h2>
  )
}