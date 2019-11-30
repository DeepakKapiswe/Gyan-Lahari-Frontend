import React from 'react';
import useFetch from '../../Common/UseFetchSuspense';

export default function Users(props) {
  let url = 'http://192.168.43.28:7000/';
  const result = useFetch(url);
  const items = result.map((item) => <h2>{item.m} </h2>);
  return (
    <>
      {items}
    </>);
}
