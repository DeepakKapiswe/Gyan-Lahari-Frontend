import React from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

import {url_login} from '../apiEndpoints/api';

let url = url_login;

export default function TestLogin(props) {
  const fetcher = (...args) => fetch(url, {
   method: 'post',
    headers: {
      "Content-Type": "application/json",
      'Accept':  'application/json',
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || "ERROR : XSRF TOKEN NOT FOUND",
    },
    credentials: 'include',
    body: JSON.stringify(props.payload)
  })
  // .then(res => res.json())

  const { data, error} = useSWR(url, fetcher, { suspense: true,revalidateOnFocus: false });
  if (props.payload.userId === '') { return null; }
  console.log(data);
  if (error) return <div>Failed to Load in Login User</div>
  return (
    data ? <h1>Valid User </h1> : <h1> NOT VALID USER </h1>  
  );
}
