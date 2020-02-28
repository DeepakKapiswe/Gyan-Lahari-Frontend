import React from 'react';
import useFetch from '../../Common/UseFetchSuspense';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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

export default function AddSubscriberResult (props) {
  let url = 'http://192.168.43.28:7000/addUser/';
  const styles= useStyles();
  const result = useFetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(props.payload)
  });
  if (props.payload.custFname === '') {return null;}
  return (
    <>
      <Typography variant="h2" component="h3"
          
          className={styles.heading}>
            New Subscriber Added
            </Typography>
      <h1> {result} </h1>
    </> );
}
