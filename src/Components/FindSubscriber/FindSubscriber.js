import React from 'react';
import SubscriberCardList from '../SubscriberCard/SubscriberCardList';
import SubscriberCard from '../SubscriberCard/SubscriberCard';
import useSWR from 'swr';

let url = 'http://192.168.43.28:7000/searchSubscriber/';

export default function FindSubscriberResult(props) {
  const fetcher = (...args) => fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(props.payload)
  }).then(res => res.json())

  const { data, error} = useSWR(url, fetcher, { suspense: true });
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  const items = data.map((item) => <SubscriberCard subscriberDetails={item} />);
  if (props.payload.sqSubName === '') { return null; }
  return (
    <SubscriberCardList cards={items} header="Search Result" />
  );
}
