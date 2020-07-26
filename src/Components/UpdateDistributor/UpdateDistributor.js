import React from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { url_updateDistributor } from '../../apiEndpoints/api';

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


let url = url_updateDistributor;

export default function UpdateDistributorResult (props) {
  const fetcher = (...args) => fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
      'Accept':  'application/json',
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || "ERROR : XSRF TOKEN NOT FOUND",
    },
    body: JSON.stringify(props.payload)
  }).then(res => res.json())

  const styles= useStyles();
  const { data, error} = useSWR(url, fetcher, { suspense: true });
  if (props.payload.distName === '') {return <div>Empty Query</div>}
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  
  return (
    <>
      <Typography variant="h2" component="h3"
          className={styles.heading}>
            Distributor Updated Successfully!
      </Typography>
      <h1> {data} </h1>
    </> );
}
