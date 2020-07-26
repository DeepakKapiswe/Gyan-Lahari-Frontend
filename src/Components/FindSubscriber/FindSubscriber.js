import React from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

import SubscriberCardList from '../SubscriberCard/SubscriberCardList';
import SubscriberCard from '../SubscriberCard/SubscriberCard';
import { url_searchSubscriber } from '../../apiEndpoints/api';


let url = url_searchSubscriber;

export default function FindSubscriberResult(props) {
  const fetcher = (...args) => fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
      'Accept':  'application/json',
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || "ERROR : XSRF TOKEN NOT FOUND",
    },
    body: JSON.stringify(props.payload)
  }).then(res => res.json())

  const { data, error} = useSWR(url, fetcher, { suspense: true,revalidateOnFocus: false });
  if (props.payload.sqSubName === '') { return null; }
  if (error) return <div>Failed to Load in Find Subscriber</div>
  if (!data) return <div>loading...</div>
  const items = data.map((item) => <SubscriberCard subscriberDetails={item} />);
  const pdfData ={subscriberListData: data, searchData : props.payload, meta : 'SearchResultList'} 
  return (
    <SubscriberCardList cards={items} header="Search Result" pdfData={pdfData} />
  );
}
