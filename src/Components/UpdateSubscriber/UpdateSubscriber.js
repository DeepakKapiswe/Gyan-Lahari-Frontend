import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useSWR from 'swr';

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

let url = 'http://192.168.43.28:7000/updateSubscriber/';

export default function UpdateSubscriberResult (props) {
  const fetcher = (...args) => fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(props.payload)
  }).then(res => res.json())

  const styles= useStyles();
  const { data, error} = useSWR(url, fetcher, { suspense: true, refreshInterval: 99999999999999 , revalidateOnFocus: false });
  if (props.payload.subName === '') {return <div>Empty Query</div>}
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  
  return (
    <>
      <Typography variant="h2" component="h3"
          className={styles.heading}>
            Subscriber Updated Successfully!
      </Typography>
      <h1> {data} </h1>
    </> );
}
