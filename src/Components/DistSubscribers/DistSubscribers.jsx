import React from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

import SubscriberCardList from '../SubscriberCard/SubscriberCardList';
import SubscriberCard from '../SubscriberCard/SubscriberCard';
import { url_distSubscribers } from '../../apiEndpoints/api';
import LoginPrompt from '../LoginPrompt/LoginPrompt';

export default function DistSubscribers(props) {
  const url = url_distSubscribers ;
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
  if (props.payload.distId === '') { return null; }
  if (error) return <div>Failed to Load in DistSubscribers </div>
  if (!data) return <div>loading...</div>
  if (data === 401) return <LoginPrompt/>
  const jsonData = data;
  const items = data.map((item) => <SubscriberCard subscriberDetails={item} />);
  const pdfData ={subscriberListData: jsonData, meta : 'AllSubscribers'}
  return (
    <SubscriberCardList cards={items} header={"All Subscribers Of Distributor: " + props.payload} pdfData={pdfData} noPdf={false} />
  );
}
