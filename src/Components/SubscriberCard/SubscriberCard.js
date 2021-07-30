import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import { navigate } from '@reach/router';
import { useSaveNextLocation } from '../../Hooks/SaveLocation';
import Box from '@material-ui/core/Box';



const useStyles = makeStyles(({ breakpoints, spacing, shadows }) => ({
  card: {
    width:'100%',
    maxWidth: 500,
    // borderRadius: spacing(2), // 16px
    transition: '0.3s',
    // boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    boxShadow: shadows[20],
    position: 'relative',
    overflow: 'initial',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-around',
    paddingLeft: 3,
    paddingRight: 3,
    // background:
    //       'rgb(247, 249, 250)',
    backgroundColor: 'rgb(245, 247, 235)',
    // background:
    //   'linear-gradient(34deg, rgba(55,16,83,1) 0%, rgba(162,73,190,1) 29%, rgba(33,16,83,1) 92%)',
    [breakpoints.up('sm')]: {
      textAlign: 'left',
    },
    borderBottomLeftRadius: '20%',
    // borderBottomRightRadius: '20%',
    // borderTopLeftRadius: '100%',
    borderTopRightRadius: '20%',
    background: '#fdeeee',
    background: '-webkit-radial-gradient(top left, #fdeeee, #e8c89b)',
    background: '-moz-radial-gradient(top left, #fdeeee, #e8c89b)',
    background: (props) => {
      if (props.status === 'Active') return 'radial-gradient(ellipse at top left, #fdeeee, #e8c89b);'
      if (props.status === 'FutureSafe') return 'radial-gradient(at left top, rgb(253, 238, 238), rgb(224 255 94 / 33%));'
      if (props.status === 'Expired') return 'radial-gradient(ellipse at top left, #faffbc, #e82626f2);'
      },
  },
  cardExpanded: {
    width: '100%',
    maxWidth: 500,
    // borderRadius: spacing(2), // 16px
    transition: '0.3s',
    // boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    boxShadow: shadows[20],
    position: 'relative',
    overflow: 'initial',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-around',
    paddingLeft: 3,
    paddingRight: 3,
    // background:
    //       'rgb(247, 249, 250)',
    backgroundColor: 'rgb(245, 247, 235)',
    // background:
    //   'linear-gradient(34deg, rgba(55,16,83,1) 0%, rgba(162,73,190,1) 29%, rgba(33,16,83,1) 92%)',
    [breakpoints.up('sm')]: {
      textAlign: 'left',
    },
    borderRadius: '4%',
    background: '#fdeeee',
    background: '-webkit-radial-gradient(top left, #fdeeee, #e8c89b)',
    background: '-moz-radial-gradient(top left, #fdeeee, #e8c89b)',
    background: 'radial-gradient(ellipse at top left, #fdeeee, #e8c89b);',
  },
  cardSmall: {
    width: '100%',
    minWidth: 85,
    maxWidth: 100,

    // borderRadius: spacing(0.9), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    overflow: 'initial',
    display: 'flex',
    flexDirection: 'column',
    justify: 'center',
    textAlign: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    background:
      'rgb(247, 249, 250)',
    background:
      'linear-gradient(146deg, rgba(248,255,16,0.7077205882352942) 1%, rgba(254,255,254,1) 20%, rgba(194,247,143,1) 65%)',
    [breakpoints.up('sm')]: {
      textAlign: 'center',
    },
    borderBottomLeftRadius: '30%',
    borderTopRightRadius: '20%',
    // borderBottomRightRadius: '20%',
    // borderTopLeftRadius: '20%',
    // background: 'radial-gradient(ellipse at center, #FFFFFF, #F0EBE4)',
  },
  overline: {
    lineHeight: 1.5,
    // color: '#ffffff',
    color: 'rgb(0 0 0)',
    fontWeight: '700',
    fontSize: '1.1rem',
    opacity: 0.8,
  },
  heading: {
    fontWeight: '700',
    color: 'rgba(113, 11, 11,1)',
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
    // color: '#220a70',
    color: 'rgba(113, 11, 11,1)',
    fontSize: '1.1rem',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 9,
    paddingLeft: 10,
    paddingRight: 10,
    // color: '#ffffff',
    textTransform: 'none',
    width: '100%',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.32)',
    },
    [breakpoints.up('sm')]: {
      width: 'auto',
    },
    background: 'radial-gradient(ellipse at center, #FFFFFF, #F0EBE4)',
  },
  messageBox: {
    textAlign: 'center',
    flexGrow: 1,
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'rgba(113, 11, 11,1)',
    padding: '10px 5px 10px 5px',
    margin: '10px 0px 10px 0px',
    fontWeight: 'bold',
    color: '#e1ff00',
    background: '#652828',
    background: '-webkit-radial-gradient(center, #652828, #ff0d0d)',
    background: '-moz-radial-gradient(center, #652828, #ff0d0d)',
    background: 'radial-gradient(ellipse at center, #652828, #ff0d0d)',
    // borderBottomLeftRadius: '20px',
    // borderTopRightRadius: '20px',
  },
  gridCard: {
    paddingTop: '10px',

  },

}));

function computeCardBackground(currPlan, upcomingPlans) {
  if (upcomingPlans && upcomingPlans.length > 0) return 'FutureSafe';
  if (currPlan === null) return 'Expired';
  return 'Active';
}

export default function SubscriberCard(props) {
  const sp = " ";
  const sD = props.subscriberDetails;

  // const styles = useStyles(computeCardBackground(sD.currPlan, sD.upcomingPlans));
  const styles = useStyles({status : computeCardBackground(sD.currPlan, sD.upcomingPlans)});
  
  const [expanded, setExpanded] = useState(false);
  const saveNextLocation = useSaveNextLocation();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const handleEditClick = () => {
    saveNextLocation("/patrika/editSubscriber", { state: { subscriber: sD } });
    navigate("/patrika/editSubscriber", { state: { subscriber: sD } });
  };
  
  const handleRenewClick = () => {
    saveNextLocation("/patrika/renewSubscription", { state: { lastSubscription: sD } });
    navigate("/patrika/renewSubscription", { state: { lastSubscription: sD } });
  };

  return (
    <>
      <Container maxWidth="sm">
        <Card className={expanded ? styles.cardExpanded : styles.card}>
        {/* <Card className={expanded ? styles.cardExpanded : computedCardClass(sD.currPlan,[] || sD.upcomingPlans)}> */}
          <CardContent className={styles.content}>
            <Grid item>
              <Typography variant="h5" component="h2"
                className={styles.heading} gutterBottom>
                {sD.subName}
              </Typography>
            </Grid>
            <Grid container
              spacing={1}
              direction="row"
              alignItems="flex-end"
            // alignItems="flex-start"
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
                    <Typography className={styles.overline} gutterBottom variant={'overline'}>
                      {sD.subAbout}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={styles.overline} gutterBottom variant={'overline'}>
                      {sD.subAdd1}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={styles.overline} gutterBottom variant={'overline'}>
                      {sD.subAdd2}
                    </Typography>
                  </Grid>
                  <Grid item >
                    <Typography className={styles.overline} gutterBottom variant={'overline'}>
                      {sD.subPost}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={styles.overline} gutterBottom variant={'overline'}>
                      {sD.subCity}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={styles.overline} gutterBottom variant={'overline'}>
                      {sD.subState}
                    </Typography>{sp}{sp}{sp}{sp}
                    <Typography className={styles.overline} gutterBottom variant={'overline'}>
                      {sD.subPincode}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={styles.overline} gutterBottom variant={'overline'}>
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
                        <Typography variant={'subtitle'} gutterBottom>
                          SC : {sD.subId}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item>
                    <Card className={styles.cardSmall}>
                      <CardContent className={styles.cardcontent}>
                        <Typography variant={'subtitle'} gutterBottom>
                          DC : {sD.subDistId}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  {sD.currPlan ? 
                    <Grid item>
                      <Card className={styles.cardSmall}>
                        <CardContent className={styles.cardcontent}>
                          <Typography variant={'subtitle'} gutterBottom >
                            {sD.currPlan.subplan} Year <br />
                            {sD.currPlan.substartvol}-{sD.currPlan.subendvol}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    :
                   sD.subscriptions ? <Grid item>
                      <Card className={styles.cardSmall}>
                        <CardContent className={styles.cardcontent}>
                          <Typography variant={'subtitle'} gutterBottom >
                            {sD.subscriptions[0].subplan} Year <br />
                            {sD.subscriptions[0].substartvol}-{sD.subscriptions[0].subendvol}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    :
                    null
                  }
                </Grid>
              </Grid>
            </Grid>
            {!sD.currPlan && <Box className={styles.messageBox}>
              <Typography variant="h5" >
                *** No Active Subscriptions ***
                        </Typography>
            </Box>}
          </CardContent>
          {props.noActionButtons === undefined &&
            <CardActions disableSpacing>
              <Grid container
                justify="space-around"
              >
                <Grid item>

                  <Button size="small" color="primary"
                    className={styles.button}
                    onClick={handleEditClick}>
                    Edit
                </Button>
                </Grid>
                <Grid item>

                  <Button size="small" color="primary"
                    className={styles.button}
                    onClick={handleRenewClick}>
                    Renew
                </Button>
                </Grid>
                <Grid item>
                  <Button size="small" color="primary" className={styles.button}
                    onClick={handleExpandClick}>
                    {expanded ? "Show Less" : "Show More"}
        </Button>
                </Grid>
              </Grid>
            </CardActions>}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Grid item>
                <Typography className={styles.overline} gutterBottom variant={'body1'}>
                  Subscriptions
                </Typography>
                <Divider variant="middle" />
                <Typography variant="subtitle1">
                  Current Plan :
                        </Typography>
                {sD.currPlan
                  ? <Subscription subscriptionDetails={sD.currPlan} />
                  : <Typography
                    variant="subtitle1" align="right"
                  >
                    <Divider variant="middle" />
                    <i>
                      No Plan Currently Active! <br />
                                    Please Renew <br />
                      <span>
                        Feel free to Contact: +91-9155950505
                                    </span>
                    </i>
                    <Divider variant="middle" />
                  </Typography>
                }
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography variant="subtitle1">
                      Upcoming Plans :
                  </Typography>

                  </Grid>
                  <Grid item>
                    <Typography variant={'body1'} align="right" >
                      {sD.upcomingPlans && sD.upcomingPlans.length}
                    </Typography>

                  </Grid>
                </Grid>
                {sD.upcomingPlans
                  ? <>
                    {sD.upcomingPlans.map(sub => (
                      <Grid item className={styles.gridCard}>
                        <Subscription subscriptionDetails={sub} />
                      </Grid>))
                    }
                  </>
                  : <Typography variant={'body1'} align="right">
                    <Divider variant="middle" />
                    <i>You have no Upcoming Plans <br />
                                    Please Renew Subscriptions before <br />
                                    expiry to avoid discontinuity <br />
                                    Feel free to Contact: +91-9155950505</i>
                    <Divider variant="middle" />
                  </Typography>

                }
                <Grid container justify="space-between">
                  <Grid item>
                    <Typography variant="subtitle1" >
                      Expired Plans :
                      </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" align="right">
                      {sD.oldPlans && sD.oldPlans.length}
                    </Typography>
                  </Grid>
                </Grid>

                {sD.oldPlans
                  ? <>
                    {sD.oldPlans.map(sub => (
                      <Grid item className={styles.gridCard} >
                        <Subscription subscriptionDetails={sub} />
                      </Grid>))
                    }
                  </>
                  : <Typography variant={'body1'} align="right" >
                    <Divider variant="middle" />
                    <i>No Plans Expired</i>
                    <Divider variant="middle" />
                  </Typography>

                }
                <Divider variant="middle" />
              </Grid>
              {/* <Typography paragraph className={styles.overline} gutterBottom variant={'body1'}>
                Contact Person: <br />Distributor Name And Number Here
            </Typography> */}
            </CardContent>
          </Collapse>
        </Card>
      </Container>

    </>
  )
};

function Subscription(props) {
  const s = props.subscriptionDetails;
  const styles = useStyles();
  return (
    <Card variant="outlined" classname={styles.subscriptiopnCard}>

      <Typography variant="button"
        align="left" color="textSecondary"
      >
        {makeColumn("Plan", <>{s.subplan} Years</>)}
        <Divider variant="fullWidth" />
        {makeColumn("Valid for Volume Number", <> {s.substartvol} --{'>'} {s.subendvol}</>)}
        <Divider variant="fullWidth" />
        {makeColumn("Subscription Id", s.subscriptionid)}
        <Divider variant="fullWidth" />
        {makeColumn("Date", formatDate(s.subcreatedat))}
        <Divider variant="fullWidth" />
        {makeColumn("Slip No.", s.subslipnum)}
        <Divider variant="fullWidth" />
        {makeColumn("Type", s.subtype)}
      </Typography>
    </Card>

  );
}

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const makeColumn = (str, comp) => {
  return <Grid container justify="space-between" alignItems="baseline" spacing={1}>
    <Grid item>
      <Typography variant="button" color="textSecondary" >
        <i>{str}</i>
      </Typography>
    </Grid>
    <Grid item>
      <Typography variant="body2" align="right" >
        <b>
          {comp}
        </b>
      </Typography>
    </Grid>
  </Grid>
}