import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useSWR from 'swr';
import { url_addDistributor } from '../../apiEndpoints/api';
import Cookies from 'js-cookie';

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

let url = url_addDistributor;

export default function AddDistributorResult (props) {
  const styles= useStyles();
  const fetcher = (...args) => fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
      'Accept':  'application/json',
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || "ERROR : XSRF TOKEN NOT FOUND",
    },
    body: JSON.stringify(props.payload)
  }).then(res => res.json())

  const { result, error} = useSWR(url, fetcher, { suspense: true });
  if (error) return <div>failed to load</div>
  if (!result) return <div>loading...</div>

  if (props.payload.distName === '') {return <div>Empty Query</div>}
  return (
    <>
      <Typography variant="h2" component="h3"
          
          className={styles.heading}>
            New Distributor Added
      </Typography>
      <h1> {result} </h1>
    </> );
}
