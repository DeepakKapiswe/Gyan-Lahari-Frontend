import React from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { url_distViewDistributor } from '../../apiEndpoints/api';
import LoginPrompt from '../LoginPrompt/LoginPrompt';
import { useSaveLastLocation, useSaveNextLocation } from '../../Hooks/SaveLocation';
import DistributorDetails from '../DistributorDetails/DistributorDetails';

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


let url = url_distViewDistributor;

export default function FetchDistributorDashboard (props) {
  const styles = useStyles();
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
  saveNextLocation("/distributorDashboard");


  const { data, error} = useSWR(url, fetcher, { suspense: true });
  if (error) return <div> Some Error occured while fetching data </div>
  if (!data) return <div>loading...</div>
  if (data === 401) return <LoginPrompt/>

  const distData = data[0];
  return (
    <>
      <Typography variant="h2" component="h3"
          className={styles.heading}>
            Distributor Dashboard
      </Typography>
      {distData && <DistributorDetails distributor={distData} />}
    </> );
}
