import React from 'react';
import useSWR from 'swr'
import Cookies from 'js-cookie';

import SubscriberCardList from '../SubscriberCard/SubscriberCardList';
import { url_distGetAllSubscriberApplications, url_getAllSubscriberApplications } from '../../apiEndpoints/api';
import LoginPrompt from '../LoginPrompt/LoginPrompt';
import { useSaveNextLocation } from '../../Hooks/SaveLocation';
import { useLocation } from '@reach/router';
import { useAppState } from '../../Contexts/AppContext';
import SubscriptionApplicationCard from '../SubscriptionApplicationCard/SubscriptionApplicationCard';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
  cardSpacing: {
      margin: spacing(1),
  },
  background: {
    //   backgroundColor : '#e8ffff'
  }
    }));

export default function ViewAllSubscriberApplications(props) {
  const classes = useStyles();
  const saveNextLocation = useSaveNextLocation();
  const location = useLocation();
  saveNextLocation(location.pathname,{state:{}})
  const {userType} = useAppState();
  const url = userType === 'UDistributor' ? url_distGetAllSubscriberApplications : url_getAllSubscriberApplications;
  const fetcher = (...args) => fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Accept':  'application/json',
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || "ERROR : XSRF TOKEN NOT FOUND",
    },
    credentials: 'include',
    body: JSON.stringify(props.payload)
  }).then(res => res.ok ? res.json() : res.status);

  const { data, error} = useSWR(url, fetcher, { suspense: true });
  if (error) return <div> Some Error occured while fetching data </div>
  if (!data) return <div>loading...</div>
  if (data === 401) return <LoginPrompt/>
  const jsonData = data;
  const items = jsonData.map((item) => <div className={classes.cardSpacing}>
        <SubscriptionApplicationCard
      subscriberData={item.saSubscriberData}
      serial={item.saApplicationId}
      />
      </div> );
  return <div className={classes.background}>
            <SubscriberCardList cards={items} noPdf header="All Subscription Applications" />
      </div>;
}
