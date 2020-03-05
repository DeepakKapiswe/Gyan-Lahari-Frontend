import React from 'react';
import useFetch from '../../Common/UseFetchSuspense';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SubscriberCardList from '../SubscriberCard/SubscriberCardList';
import SubscriberCard from '../SubscriberCard/SubscriberCard';

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

export default function FindSubscriberResult (props) {
  let url = 'http://192.168.43.28:7000/searchSubscriber/';
  const styles= useStyles();
  const result = useFetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(props.payload)
  });
  const items = result.map((item) => <SubscriberCard subscriberDetails={item}/>);
  if (props.payload.sqSubName === '') {return null;}
  return (
      <>
      <Typography variant="h2" component="h3"
          className={styles.heading}>
              Search Result From Database
      </Typography>
      <SubscriberCardList cards={items}/>;
    </> );
}
