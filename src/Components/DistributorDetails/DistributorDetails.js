import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import DistributorCard from '../DistributorCard/DistributorCard';
import FlowerDiv from '../FlowerDiv/FlowerDiv';

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
          Distributor Details
              </Typography>

        <Typography variant="h2" component="h3"
          className={styles.heading}>
         वितरक विवरण
              </Typography>
              <FlowerDiv/>
      </Grid>

      <Grid item className={styles.title}>
        <DistributorCard distributorDetails={props.distributor || sample} />
      </Grid>
    </Grid>
  );
}

const sample =
{ 
  distId: "32",
  distName: "SriRam Bhai",
  distAbout: "Sri Kabir Gyan Mandir",
  distAdd: "संत कबीर ज्ञान मार्ग",
  distCity: "Giridih",
  distPhone: "9155950505",
}