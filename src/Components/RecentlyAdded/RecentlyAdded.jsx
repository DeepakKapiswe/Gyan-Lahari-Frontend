import React from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

import SubscriberCardList from '../SubscriberCard/SubscriberCardList';
import SubscriberCard from '../SubscriberCard/SubscriberCard';
import { url_recentlyAddedSubscribers } from '../../apiEndpoints/api';
import LoginPrompt from '../LoginPrompt/LoginPrompt';

let url = url_recentlyAddedSubscribers;
export default function RecentlyAddedSubscribers(props) {
  const fetcher = (...args) => fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
      'Accept':  'application/json',
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || "ERROR : XSRF TOKEN NOT FOUND",
    },
    credentials: 'include',
    body: JSON.stringify(props.payload)
  }).then(res => res.ok ? res.json() : res.status);

  const { data, error} = useSWR(url, fetcher, { suspense: true,revalidateOnFocus: false });
  if (props.payload.raCount === '') { return null; }
  if (error) return <div>Failed to Load in Recently Added Subscriber</div>
  if (!data) return <div>loading...</div>
  if (data === 401) return <LoginPrompt/>
  const items = data.map((item) => <SubscriberCard subscriberDetails={item} />);
  return (
    <SubscriberCardList cards={items} header="Recently Added Subscribers" pdfData={''} noPdf={true} />
  );
}
