import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  card: {
    width: '100%',
    maxWidth: 500,
    borderRadius: spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    overflow: 'initial',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-around',
    // textAlign: 'center',
    paddingLeft: 3,
    paddingRight: 3,
    background:
      'linear-gradient(34deg, rgba(55,16,83,1) 0%, rgba(162,73,190,1) 29%, rgba(33,16,83,1) 92%)',
    [breakpoints.up('sm')]: {
      textAlign: 'left',
    },
  },
  cardSmall: {
    width: '100%',
    minWidth: 85,
    maxWidth: 100,

    borderRadius: spacing(0.9), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    overflow: 'initial',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    justify: 'center',
    textAlign: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 1,
    paddingBottom: 1,
    background: 'rgb(248,255,16)',
    background:
      'linear-gradient(146deg, rgba(248,255,16,0.7077205882352942) 1%, rgba(254,255,254,1) 20%, rgba(194,247,143,1) 65%)',
    [breakpoints.up('sm')]: {
      textAlign: 'center',
    },
  },
  media: {
    flexShrink: 0,
    width: '30%',
    paddingTop: '30%',
    marginLeft: 'auto',
    marginRight: 'auto',
    [breakpoints.up('sm')]: {
      marginRight: 'initial',
    },
  },
  overline: {
    lineHeight: 1.5,
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '1.1rem',
    opacity: 0.8,
  },
  heading: {
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
    fontSize: '1.5rem',
  },
  cardcontent: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,

    lineHeight: 1.5,
    fontWeight: '900',
    opacity: 0.95,
    color: '#220a70',
    fontSize: '1.1rem',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 100,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#ffffff',
    textTransform: 'none',
    width: '100%',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.32)',
    },
    [breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  button1: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 100,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#ffffff',
    textTransform: 'none',
    width: '100%',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.32)',
    },
    [breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
}));

export default function SubscriberDetails(props) {
  const sD = sample;
  const sp = " ";
  const styles = useStyles();
  return (
    <Container maxWidth="sm">
      <Card className={styles.card}>
        <CardContent className={styles.content}>
          <Grid container
            spacing={1}
            direction="row"
            alignItems="flex-end"
          >
            <Grid item xs container>
              <Grid container
                component={Typography}
                spacing={0}
                direction="column"
                justify="flex-start"
                alignItems="baseline"
              >
                <Grid item>
                  <Typography className={styles.heading} variant={'h6'} gutterBottom>
                    {sD.subSaluation}{sp}{sD.subFname}{sp}{sD.subMname}{sp}{sD.subLname}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={styles.overline} variant={'overline'}>
                    {sD.subAbout}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={styles.overline} variant={'overline'}>
                    {sD.subAdd1}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={styles.overline} variant={'overline'}>
                    {sD.subAdd2}
                  </Typography>
                </Grid>
                <Grid item >
                  <Typography className={styles.overline} variant={'overline'}>
                    {sD.subPost}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={styles.overline} variant={'overline'}>
                    {sD.subCity}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={styles.overline} variant={'overline'}>
                    {sD.subState}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={styles.overline} variant={'overline'}>
                    {sD.subPincode}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={styles.overline} variant={'overline'}>
                    {sD.subPhone}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid
                container
                spacing={1}
                direction="column"
                justify="flex-start"
                alignItems="strech"
              >
                <Grid item>
                  <Card className={styles.cardSmall}>
                    <CardContent className={styles.cardcontent}>
                      <Typography variant={'subtitle'}>
                        SN : ABCD
                  </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item>
                  <Card className={styles.cardSmall}>
                    <CardContent className={styles.cardcontent}>
                      <Typography variant={'subtitle'}>
                        Dist: 312
                  </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item>
                  <Card className={styles.cardSmall}>
                    <CardContent className={styles.cardcontent}>
                      <Typography variant={'subtitle'}>
                        Vol:<br /> 178 -> 192
                  </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Button className={styles.button1}>Edit Details</Button>
        </CardContent>
      </Card>
    </Container>
  );
};


const sample =
{
  subStartVol: "1",
  subSubscriptionType: "3 Year",
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