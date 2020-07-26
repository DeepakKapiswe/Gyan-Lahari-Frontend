import React from 'react';
import useSWR from 'swr'
import Cookies from 'js-cookie';

import SubscriberCard from '../SubscriberCard/SubscriberCard';
import SubscriberCardList from '../SubscriberCard/SubscriberCardList';
import { url_getAllSubscribers } from '../../apiEndpoints/api';

let url = url_getAllSubscribers;

// const fetcher = (...args) => fetch(...args).then(res => res.json())


export default function ViewAllSubscribers(props) {
  const fetcher = (...args) => fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Accept':  'application/json',
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || "ERROR : XSRF TOKEN NOT FOUND",
    },
    credentials: 'include',
    body: JSON.stringify(props.payload)
  }).then(res => res.json())

  const { data, error} = useSWR(url, fetcher, { suspense: true });
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  const items = data.map((item) => <SubscriberCard subscriberDetails={item}/>);
  const pdfData ={subscriberListData: data, meta : 'AllSubscribers'} 
  return <SubscriberCardList cards={items} header="All Subscribers" pdfData={pdfData}/>;
}
