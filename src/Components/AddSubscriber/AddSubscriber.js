import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useSWR from 'swr';
import FlowerDiv from '../FlowerDiv/FlowerDiv';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  heading: {
    color: '#ffffff',
    [breakpoints.down('md')]: {
      fontSize: '3rem',
    },
    [breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
}));

let url = 'http://192.168.43.28:7000/addUser/';

export default function AddSubscriberResult (props) {
  const styles= useStyles();
  const fetcher = (...args) => fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(props.payload)
  }).then(res => res.json())

  const { result, error} = useSWR(url, fetcher, { suspense: true });
  if (error) return <div>failed to load</div>
  if (!result) return <div>loading...</div>
  
  if (props.payload.subName === '') {return <div>Empty Query</div>}
  return (
    <>
      <Typography variant="h2" component="h3"
          
          className={styles.heading}>
            New Subscriber Added !!
            </Typography>
            <FlowerDiv/>
      <h1> {result} </h1>
    </> );
}
