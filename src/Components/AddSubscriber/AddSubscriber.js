import React, { Suspense } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useSWR from 'swr';
import FlowerDiv from '../FlowerDiv/FlowerDiv';
import { LinearProgress } from '@material-ui/core';
import { useNavigate } from "@reach/router"
import { url_addUser } from '../../apiEndpoints/api';
import Cookies from 'js-cookie';

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

let url = url_addUser;
export default function AddSubscriberResult (props) {
  // const newSubscriberData = props.location.state.newSubscriberData;
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
  }).then(res => res.json())

  const { data, error} = useSWR(url, fetcher, { suspense: true, refreshInterval: 99999999999999 , revalidateOnFocus: false });
  // if (props.location.state == null) { return (
  //     <>
  //       <h1> Oops... Bad Add Query Please Click Add Again !! </h1>
  //       <BackButton label="Add Again" path="addNewSubscriber"/>
  //     </>
  //   ); }
  if (newSubscriberData.subName === '') {return <div>Empty Query</div>}
  if (error) return <div>failed to load</div>
  // if (!data) return <LinearProgress/>
  navigate("/viewSubscriber", {state:{subscriber:data }});  
  
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
