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
  if (props.payload.sqSubName === '') { return null; }
  if (error) return <div>Failed to Load in Find Subscriber</div>
  if (!data) return <div>loading...</div>
  const items = data.map((item) => <SubscriberCard subscriberDetails={item} />);
  return (
    <SubscriberCardList cards={items} header="Search Result" />
  );
}
