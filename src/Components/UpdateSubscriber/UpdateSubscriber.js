import React from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

// import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { url_applyForUpdateSubscriber, url_distApplyForUpdateSubscriber, url_subApplyForEditSubscriber} from '../../apiEndpoints/api';
import LoginPrompt from '../LoginPrompt/LoginPrompt';
import { useAppState } from '../../Contexts/AppContext';

// const useStyles = makeStyles(({ breakpoints, spacing }) => ({
//   heading: {
//     color: '#aaaaaa',
//     [breakpoints.down('md')]: {
//       fontSize: '3rem',
//     },
//     [breakpoints.down('sm')]: {
//       fontSize: '2rem',
//     },
//   },
// }));



export default function UpdateSubscriberResult (props) {
  const {userType} = useAppState();
  const url =   userType === 'USubscriber' ? url_subApplyForEditSubscriber :
                userType === 'UDistributor' ? url_distApplyForUpdateSubscriber :
                url_applyForUpdateSubscriber ;
  const fetcher = (...args) => fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
      'Accept':  'application/json',
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || "ERROR : XSRF TOKEN NOT FOUND",
      },
    body: JSON.stringify(props.payload)
  }).then(res => res.ok ? res.json() : res.status);

  // const styles= useStyles();
  const { data, error} = useSWR(url, fetcher, { suspense: true, refreshInterval: 99999999999999 , revalidateOnFocus: false });
  if (props.payload.subName === '') {return <div>Empty Query</div>}
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  if (data === 401) return <LoginPrompt/>
  
  return (
    <>
      <Typography variant="h4" component="h4">
            Successfully Applied for Updation with Serial : {data.saApplicationId}
      </Typography>
    </> );
}
