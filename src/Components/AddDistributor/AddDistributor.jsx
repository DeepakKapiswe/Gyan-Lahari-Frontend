import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useSWR from 'swr';
import { url_addDistributor } from '../../apiEndpoints/api';
import Cookies from 'js-cookie';
import LoginPrompt from '../LoginPrompt/LoginPrompt';
import { useNavigate } from '@reach/router';
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

let url = url_addDistributor;

export default function AddDistributor (props) {
  const styles= useStyles();
  const navigate = useNavigate();
  const payload = props.newDistributorData;
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
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  if (data === 401) return <LoginPrompt/>
  if (payload.distName === '') {return <div>Empty Query</div>}
  navigate("/viewAddedDistributor", {state:{distributor:data }})
  return (
    <>
      <Typography variant="h2" component="h3"
          className={styles.heading}>
            New Distributor Added !!
      </Typography>
      <FlowerDiv/>
    </> );
}
