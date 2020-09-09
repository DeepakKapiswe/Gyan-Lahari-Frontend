import React from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

import SubscriberCardList from '../SubscriberCard/SubscriberCardList';
import SubscriberCard from '../SubscriberCard/SubscriberCard';
import { url_recentlyAddedSubscribers, url_distRecentlyAddedSubscribers } from '../../apiEndpoints/api';
import LoginPrompt from '../LoginPrompt/LoginPrompt';
import { useAppState } from '../../Contexts/AppContext';

export default function RecentlyAddedSubscribers(props) {
  const {userType} = useAppState();
  const url = userType === 'UDistributor' ? url_distRecentlyAddedSubscribers : url_recentlyAddedSubscribers ;
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
