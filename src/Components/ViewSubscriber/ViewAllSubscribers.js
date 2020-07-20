import React from 'react';
import useSWR from 'swr'
import SubscriberCard from '../SubscriberCard/SubscriberCard';
import SubscriberCardList from '../SubscriberCard/SubscriberCardList';

let url = 'https://192.168.43.28:7000/';

// const fetcher = (...args) => fetch(...args).then(res => res.json())


export default function ViewAllSubscribers(props) {
  const fetcher = (...args) => fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Accept':  'application/json',
      // 'X-XSRF-TOKEN': localStorage.getItem('XSRF-TOKEN') || undefined,
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(props.payload)
  }).then(res => res.json())

  const { data, error} = useSWR(url, fetcher, { suspense: true });
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  const items = data.map((item) => <SubscriberCard subscriberDetails={item}/>);
  const pdfData ={subscriberListData: data, meta : 'AllSubscribers'} 
  return <SubscriberCardList cards={items} header="All Subscribers" pdfData={pdfData}/>;
}
