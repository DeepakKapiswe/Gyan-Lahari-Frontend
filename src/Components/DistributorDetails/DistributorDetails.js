import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import DistributorCard from '../DistributorCard/DistributorCard';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  card: {
    flexGrow: 1,
    background: 'linear-gradient(to bottom,  rgba(255,197,120,1) 6%,rgba(255,197,120,1) 17%,rgba(255,197,120,1) 29%,rgba(255,197,120,1) 29%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 49%,rgba(255,197,120,1) 60%,rgba(255,197,120,1) 60%,rgba(251,157,35,1) 97%,rgba(251,157,35,1) 98%,rgba(251,157,35,1) 98%,rgba(251,157,35,1) 100%,rgba(251,157,35,1) 101%)',
    // background: '#870000',   /* fallback for old browsers */
    // background: '-webkit-linear-gradient(to right, #190A05, #870000)',  /* Chrome 10-25, Safari 5.1-6 */
    // background: 'linear-gradient(to right, #190A05, #870000)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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

export default function DistributorDetails() {
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
      </Grid>

      <Grid item className={styles.title}>
        <DistributorCard distributorDetails={sample} />
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