import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FlowerDiv from '../FlowerDiv/FlowerDiv';
import SubscriberCard from '../SubscriberCard/SubscriberCard';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  card: {
    flexGrow: 1,
    backgroundColor: '#ebf5ab',
   [breakpoints.up('md')]: {
    padding:spacing(30),
  },},
  title: {
    flexGrow: 1,
  },
  heading: {
    // color: '#ffffff',
    color: '#110F4C',

    [breakpoints.down('md')]: {
      fontSize: '3rem',
    },
    [breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
  gridContent:{
    textAlign:'center',
  },
}));

export default function DistributorDetails(props) {
  const subscriber = props.subscriber;
  const styles = useStyles();
  return (
    <Grid
      container xs
      className={styles.card}
      direction="row-reverse"
      justify="center"
      alignItems="center"
    >
      <Grid item alignItems="center" className={styles.gridContent}>

        <Typography variant="h2" component="h3"
          
          className={styles.heading}>
          Subscription Details
              </Typography>

        <Typography variant="h2" component="h3"
          className={styles.heading}>
         सदस्यता विवरण
              </Typography>
              <FlowerDiv/>
      </Grid>

      <Grid item className={styles.title}>
        <SubscriberCard subscriberDetails={subscriber} />
      </Grid>
    </Grid>
  );
}