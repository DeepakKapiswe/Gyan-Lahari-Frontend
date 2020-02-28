import React from 'react';
import useSWR from 'swr'
import DistributorCard from '../DistributorCard/DistributorCard';
import DistributorCardList from '../DistributorCard/DistributorCardList';

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function ViewAllDistributors(props) {
  let url = 'http://192.168.43.28:7000/getAllDistributor';
  const { data, error} = useSWR(url, fetcher, { suspense: true });
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  const items = data.map((item) => <DistributorCard distributorDetails={item}/>);
  return <DistributorCardList cards={items}/>;
}
