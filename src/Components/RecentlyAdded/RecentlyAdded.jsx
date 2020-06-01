import React from 'react';
import useSWR from 'swr';

import SubscriberCardList from '../SubscriberCard/SubscriberCardList';
import SubscriberCard from '../SubscriberCard/SubscriberCard';
// import PdfDownload from '../../Common/PdfDownload/PdfDownload';

let url = 'http://192.168.43.28:7000/recentlyAddedSubscribers/';

export default function RecentlyAddedSubscribers(props) {
  const fetcher = (...args) => fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(props.payload)
  }).then(res => res.json())

  const { data, error} = useSWR(url, fetcher, { suspense: true,revalidateOnFocus: false });
  if (props.payload.raCount === '') { return null; }
  if (error) return <div>Failed to Load in Recently Added Subscriber</div>
  if (!data) return <div>loading...</div>
  const items = data.map((item) => <SubscriberCard subscriberDetails={item} />);
  return (
    <SubscriberCardList cards={items} header="Recently Added Subscribers" pdfData={''} noPdf={true} />
  );
}
