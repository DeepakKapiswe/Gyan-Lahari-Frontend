import React from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { url_viewSubscriber } from '../../apiEndpoints/api';
import LoginPrompt from '../LoginPrompt/LoginPrompt';
import SubscriberDetails from '../SubscriberDetails/SubscriberDetails';
import { useSaveLastLocation, useSaveNextLocation } from '../../Hooks/SaveLocation';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  heading: {
    color: '#aaaaaa',
    [breakpoints.down('md')]: {
      fontSize: '3rem',
    },
    [breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
}));


let url = url_viewSubscriber;

export default function SubscriberDashboard (props) {
  const styles= useStyles();
  const saveLastLocation = useSaveLastLocation();
  const saveNextLocation = useSaveNextLocation();
  const fetcher = (...args) => fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Accept':  'application/json',
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || "ERROR : XSRF TOKEN NOT FOUND",
    },
    credentials: 'include',
  }).then(res => res.ok ? res.json() : res.status);
  saveLastLocation("/");
  saveNextLocation("/subscriberDashboard");
  

  const { data, error} = useSWR(url, fetcher, { suspense: true });
  if (error) return <div> Some Error occured while fetching data </div>
  if (!data) return <div>loading...</div>
  if (data === 401) return <LoginPrompt/>

  const subData = data[0];
  return (
    <>
      <Typography variant="h2" component="h3"
          className={styles.heading}>
            Subscriber Dashboard
      </Typography>
      {data && <SubscriberDetails subscriber={subData} />}
    </> );
}
