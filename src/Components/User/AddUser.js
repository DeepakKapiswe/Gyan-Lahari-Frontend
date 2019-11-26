import React from 'react';
import useFetch from '../../Common/UseFetchSuspense';

export default function AddUser(props) {
  let url = 'http://localhost:7000/addUser/';
  const result = useFetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ "m": props.message })
  });
  return (
    <>
      <h1>Add USER PAGE </h1>

      {/* <h1>{result.m}  </h1> */}
    </>);
}
