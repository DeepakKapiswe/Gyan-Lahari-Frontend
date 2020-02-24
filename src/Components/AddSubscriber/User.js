import React from 'react';
import useSWR from 'swr'


const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Users(props) {
  let url = 'http://192.168.43.28:7000/';
  const { data, error} = useSWR(url, fetcher, { suspense: true });
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  const items = data.map((item) => <h2>{item.m} </h2>);
  return (
    <> <h1>Results from DataBase</h1>
         {items}
    </>);
}
