import React from 'react';
import useSWR from 'swr'
import SubscriberCard from '../SubscriberCard/SubscriberCard';
import SubscriberCardList from '../SubscriberCard/SubscriberCardList';

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function ViewAllSubscribers(props) {
  let url = 'http://192.168.43.28:7000/';
  const { data, error} = useSWR(url, fetcher, { suspense: true });
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  const items = data.map((item) => <SubscriberCard subscriberDetails={item}/>);
  return <SubscriberCardList cards={items} header="All Subscribers"/>;
}
