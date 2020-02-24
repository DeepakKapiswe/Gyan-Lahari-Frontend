import React from 'react';
import useFetch from '../../Common/UseFetchSuspense';

export default function AddSubscriberResult (props) {
  let url = 'http://192.168.43.28:7000/addUser/';
  const result = useFetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(props.payload)
  });
  if (props.payload.custFname === '') {return null;}
  return (
    <>
      <h1>New USER Added </h1>
      <h1> {result} </h1>
    </> );
}
