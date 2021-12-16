import React, { Suspense } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useSWR from 'swr';
import FlowerDiv from '../FlowerDiv/FlowerDiv';
import { LinearProgress } from '@material-ui/core';
import { useNavigate } from "@reach/router"
import { 
  // url_subApplyForRenewSubscriptionUpdateSubscriber
        url_distApplyForRenewSubscriptionUpdateSubscriber
       , url_applyForRenewSubscriptionUpdateSubscriber
        } from '../../apiEndpoints/api';
import Cookies from 'js-cookie';
import LoginPrompt from '../LoginPrompt/LoginPrompt';
import { useAppState } from '../../Contexts/AppContext';
import { getUserIdLS } from '../../Library/Library';

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


export default function RenewSubscriptionEditSubscriberResult (props) {
  const {userType} = useAppState();
  
  const url = userType === 'UDistributor' ? url_distApplyForRenewSubscriptionUpdateSubscriber :
              // TODO : add this  functionality(mentioned below) later
              // userType === 'USubscriber' ? url_subApplyForRenewSubscriptionUpdateSubscriber :
              url_applyForRenewSubscriptionUpdateSubscriber;

  const navigate = useNavigate();
  const payload = {};
  payload.appType = "RenewSubscriptionEditSubscriberDetails";
  payload.appSubmittedBy = getUserIdLS();
  payload.appData = props.renewalEditData;
  payload.appData.lastAppId = props.renewalEditData.subAppId;
  const styles = useStyles();
  const fetcher = (...args) => fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
      'Accept':  'application/json',
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || "ERROR : XSRF TOKEN NOT FOUND",
    },
    body: JSON.stringify(payload)
  }).then(res => res.ok ? res.json() : res.status);

  const { data, error} = useSWR(url, fetcher, { suspense: true, refreshInterval: 99999999999999 , revalidateOnFocus: false });
  if (payload.appData.subId === '') {return <div>Empty Query</div>}
  if (error) return <div>failed to load</div>
  // if (!data) return <LinearProgress/>
  if (data === 401) return <LoginPrompt/>
  navigate("/patrika/viewSubscriberApplication", {state:{subscriberApplicationData:data }});
  
  return (
    <Suspense fallback={<LinearProgress/>}>
      <Typography variant="h3" component="h3"
          className={styles.heading} align="center">
            Subscription Renewal Successfull !! <br/>
            Subscriber Update Successfull !!<br/>
            **** Jai Sri Sadguru ****
      </Typography>
      <FlowerDiv/>
    </Suspense>
     );
}
