import React from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { url_updateSubscriber } from '../../apiEndpoints/api';
import LoginPrompt from '../LoginPrompt/LoginPrompt';

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


let url = url_updateSubscriber;

export default function UpdateSubscriberResult (props) {
  const fetcher = (...args) => fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
      'Accept':  'application/json',
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || "ERROR : XSRF TOKEN NOT FOUND",
      },
    body: JSON.stringify(props.payload)
  }).then(res => res.ok ? res.json() : res.status);

  const styles= useStyles();
  const { data, error} = useSWR(url, fetcher, { suspense: true, refreshInterval: 99999999999999 , revalidateOnFocus: false });
  if (props.payload.subName === '') {return <div>Empty Query</div>}
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  if (data === 401) return <LoginPrompt/>
  
  return (
    <>
      <Typography variant="h2" component="h3"
          className={styles.heading}>
            Subscriber Updated Successfully!
      </Typography>
      <h1> {data} </h1>
    </> );
}
