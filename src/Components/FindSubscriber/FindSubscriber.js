import React from 'react';
import useFetch from '../../Common/UseFetchSuspense';
import SubscriberCardList from '../SubscriberCard/SubscriberCardList';
import SubscriberCard from '../SubscriberCard/SubscriberCard';


export default function FindSubscriberResult(props) {
  let url = 'http://192.168.43.28:7000/searchSubscriber/';
  const result = useFetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(props.payload)
  });
  const items = result.map((item) => <SubscriberCard subscriberDetails={item} />);
  if (props.payload.sqSubName === '') { return null; }
  return (
    <SubscriberCardList cards={items} header="Search Result" />
  );
}
