import React, { Suspense } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useSWR from 'swr';
import FlowerDiv from '../FlowerDiv/FlowerDiv';
import { LinearProgress } from '@material-ui/core';
import { useNavigate } from "@reach/router"
import { url_applyForNewSubscriber, url_distApplyForNewSubscriber } from '../../apiEndpoints/api';
import Cookies from 'js-cookie';
import LoginPrompt from '../LoginPrompt/LoginPrompt';
import { useAppState } from '../../Contexts/AppContext';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  heading: {
    color: '#110F4C',
    [breakpoints.down('md')]: {
      fontSize: '3rem',
    },
    [breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
}));


export default function AddSubscriberResult (props) {
  const {userType} = useAppState();
  const url =   userType === 'UDistributor' ? url_distApplyForNewSubscriber
              : url_applyForNewSubscriber;

  const navigate = useNavigate();
  const newSubscriberData = props.newSubscriberData;
  const styles= useStyles();
  const fetcher = (...args) => fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
      'Accept':  'application/json',
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || "ERROR : XSRF TOKEN NOT FOUND",
    },
    body: JSON.stringify(newSubscriberData)
  }).then(res => res.ok ? res.json() : res.status);

  const { data, error} = useSWR(url, fetcher, { suspense: true, refreshInterval: 99999999999999 , revalidateOnFocus: false });
  if (newSubscriberData.subName === '') {return <div>Empty Query</div>}
  if (error) return <div>failed to load</div>
  // if (!data) return <LinearProgress/>
  if (data === 401) return <LoginPrompt/>
  navigate("/viewSubscriberApplication", {state:{subscriberApplicationData:data }});
  
  return (
    <Suspense fallback={<LinearProgress/>}>
      <Typography variant="h2" component="h3"
          className={styles.heading} align="center">
            New Subscriber Added !!
      </Typography>
      <FlowerDiv/>
    </Suspense>
     );
}
