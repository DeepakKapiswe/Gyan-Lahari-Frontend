import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import SubscriberCard from '../SubscriberCard/SubscriberCard';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  card: {
    flexGrow: 1,
    // background: '#870000',   /* fallback for old browsers */
    // background: '-webkit-linear-gradient(to right, #190A05, #870000)',  /* Chrome 10-25, Safari 5.1-6 */
    background: 'linear-gradient(to right, #190A05, #870000)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
   [breakpoints.up('md')]: {
    padding:spacing(25),
  },},
  title: {
    flexGrow: 1,
  },
  heading: {
    color: '#ffffff',
  },
  gridContent:{
    textAlign:'center',
  },
}));

export default function SubscriberDetails() {
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
          // gutterBottom
          className={styles.heading}>
          Subscription Details
              </Typography>

        <Typography variant="h2" component="h3"
          // gutterBottom
          className={styles.heading}>
          सदस्यता विवरण
              </Typography>
      </Grid>

      <Grid item className={styles.title}>
        <SubscriberCard subscriberDetails={sample} />
      </Grid>
    </Grid>
  );
}

const sample =
{
  subStartVol: "1",
  subSubscriptionType: "3",
  subSlipNum: "1234",
  subSaluation: "Sri",
  subFname: "Sadguru",
  subMname: "Kabir",
  subLname: "Sahab",
  subAbout: "Sri Kabir Gyan Mandir",
  subAdd1: "संत कबीर ज्ञान मार्ग",
  subAdd2: "Sirsia",
  subPost: "Sihodih",
  subCity: "Giridih",
  subState: "Jharkhand",
  subPincode: "815301",
  subPhone: "9155950505",
  subRemark: "Guru Maa k charno mein barambar Naman",
}