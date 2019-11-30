import React from 'react';
import useFetch from '../../Common/UseFetchSuspense';

export default function AddUserResult (props) {
  let url = 'http://localhost:7000/addUser/';
  const result = useFetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(props.payload)
  });
  if (props.payload.m === '') {return null;}
  return (
    <>
      <h1>New USER Added </h1>
      <h1> {result.m} </h1>
    </> );
}
