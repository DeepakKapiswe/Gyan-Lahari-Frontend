import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useNavigate } from "@reach/router"

import { computeExpectedCurrVol } from '../../Common/ComputeVolume';

import UpdateSubscriberResult from '../UpdateSubscriber/UpdateSubscriber';
import BackButton from '../BackButton/BackButton';
import FlowerDiv from '../FlowerDiv/FlowerDiv';
import { Card, Divider } from '@material-ui/core';
import { useSaveLastLocation, useSaveNextLocation } from '../../Hooks/SaveLocation';


const useStyles = makeStyles(theme => (
  {

    paper: {
      margin: theme.spacing(0, 0, 2, 0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      // overflowY : 'scroll'
    },
    names: {
      margin: theme.spacing(0, 0, 0, 1),
    },
    bgColor: {
      flexGrow: 1,
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(15),
      },
      backgroundColor: '#ebf5ab',
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
    },
    heading: {
      color: '#110F4C',
      [theme.breakpoints.up('sm')]: {
        fontSize: '3rem',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '2rem',
      },
    },
    form: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function SubscriberEditForm(props) {
  const navigate = useNavigate();
  const oldDetails =
    (props.location.state !== null) ? props.location.state.lastSubscription : null;
  const [sD, setSD] = useState(oldDetails);
  const { register, handleSubmit } = useForm();
  const [userResult, setUserResult] = useState(null);
  const [endVol, setEndVol] = useState(0);
  const [subPlan, setSubPlan] = useState(sD.subscriptions[0].subplan);
  const [startVol, setStartVol] = useState(sD.subscriptions[0].subendvol + 1);
  const saveLastLocation = useSaveLastLocation();
  const saveNextLocation = useSaveNextLocation();
  saveLastLocation();

  const onSubmit = data => {
    data.subStartVol = data.subStartVol * 1;
    data.subEndVol = data.subEndVol * 1;
    data.subPlan = data.subPlan * 1;
    data.subSlipNum = data.subSlipNum * 1;
    data.subId = sD.subId;
    data.subscriptionId = sD.subscriptions[0].subscriptionid;
    saveNextLocation("/patrika/renewalResult", { state: { renewalData: data } });
    navigate("/patrika/renewalResult", { state: { renewalData: data } });

  };

  const handleStartVolChange = (event) => {
    setStartVol(event.target.value);
  };

  const handleSubscriptionTypeChange = (event) => {
    setSubPlan(event.target.value);
  };

  const handleRenewalTypeChange = (event) => {
    if (event.target.value === "Extend") { setStartVol(oldDetails.subscriptions[0].subendvol + 1); }
    else
      // fixing temporarily to hardcoded value 
      // later we have revert so that user can set default 
      // start value as per wish
      // setStartVol(computeExpectedCurrVol());
      setStartVol(86 * 1);
  };

  useEffect(() => {
    if (startVol !== 0 && subPlan !== 0) {
      setEndVol(startVol * 1 + subPlan * 4 - 1);
    }
    else {
      setEndVol(0);
    }
  }, [startVol, subPlan]);


  const onReset = () => {
    setSD(oldDetails);
  }

  const classes = useStyles();

  function RenderResult(props) {
    // conditionally render result
    if (props.result !== null) {
      return <>{userResult}</>
    }
    return (
      <Grid item alignItems="center" >

        <Typography variant="h2" component="h3"

          className={classes.heading} align="center">
          Subscription Renewal Form
        </Typography>

        <Typography variant="h2" component="h3"
          className={classes.heading} align="center">
          सदस्यता नवीनीकरण
        </Typography>
        <FlowerDiv />
      </Grid>
    );
  }

  if (sD == null) { return <h1>Bad Request</h1> }
  return (<>
    <Grid
      container xs
      className={classes.bgColor}
      direction="row-reverse"
      justify="center"
      alignItems="center"
    >
      <Container maxWidth='xl' className={classes.paper}>
        <CssBaseline>
          <>
            <RenderResult result={userResult} />
            <form onSubmit={handleSubmit(onSubmit)} >
              <React.Fragment>
                <Grid container spacing={2}
                  className={classes.form}
                  component={Paper} elevation={6}
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <Grid item xs={6} sm={4} lg={3}>
                    <NativeSelect
                      native
                      inputRef={register}
                      inputProps={{ style: { fontsize: 30, fontWeight: 700 } }}
                      id="subType"
                      name="subType"
                      required
                      label="Renewal Type"
                      onChange={handleRenewalTypeChange}
                    >
                      <option value={"Extend"}>Extend Subscription</option>
                      <option value={"Restart"}>Restart Subscription</option>
                    </NativeSelect>
                    <FormHelperText>Subscription Renewal Type</FormHelperText>
                  </Grid>

                  <Grid item xs={6} sm={4} lg={3}>
                    <TextField
                      inputRef={register}
                      inputProps={{ style: { fontsize: 30, fontWeight: 700 } }}
                      required
                      type="number"
                      id="subStartVol"
                      name="subStartVol"
                      label="Starting Volume"
                      autoComplete="subStartVol"
                      value={startVol}
                      onChange={handleStartVolChange}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} lg={3}>
                    <NativeSelect
                      native
                      inputRef={register}
                      inputProps={{ style: { fontsize: 30, fontWeight: 700 } }}
                      id="subPlan"
                      name="subPlan"
                      required
                      label="Subscription Type"
                      onChange={handleSubscriptionTypeChange}
                    >
                      <option value={subPlan}>{subPlan} Year</option>
                      <option value={1}>1 Year</option>
                      <option value={3}>3 Years</option>
                      <option value={4}>4 Years</option>
                      <option value={5}>5 Years</option>
                      <option value={10}>10 Years</option>
                      <option value={2}>2 Years</option>
                      <option value={8}>8 Years</option>
                    </NativeSelect>
                    <FormHelperText>Subscription Type</FormHelperText>

                  </Grid>
                  <Grid item xs={6} sm={4} lg={3}>
                    <TextField
                      inputRef={register}
                      inputProps={{ style: { fontsize: 30, fontWeight: 700 } }}
                      required
                      type="number"
                      id="subEndVol"
                      value={endVol}
                      name="subEndVol"
                      label="Ending Volume"
                      autoComplete="subEndVol"
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} lg={3}>
                    <TextField
                      inputRef={register}
                      inputProps={{ style: { fontsize: 30, fontWeight: 700 } }}
                      required
                      type="number"
                      id="subSlipNum"
                      name="subSlipNum"
                      label="Slip Number"
                      autoComplete="subSlipNum"
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} lg={3}>
                    <TextField
                      inputRef={register}
                      inputProps={{ style: { fontsize: 30, fontWeight: 700 } }}
                      required
                      type="number"
                      id="subDistId"
                      name="subDistId"
                      label="Distributor Id"
                      autoComplete="subDistId"
                      defaultValue={sD.subDistId}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4} lg={3}>
                    <TextField
                      inputRef={register}
                      inputProps={{ style: { fontsize: 30, fontWeight: 700 } }}
                      required
                      id="subMedium"
                      name="subMedium"
                      label="Subscription Medium"
                      autoComplete="subMedium"
                      defaultValue={"By Hand"}
                    />
                  </Grid>
                  <Grid container
                    justify="center"
                    alignItems="stretch">

                    <Grid item >
                      <Button
                        type="submit"
                        name="renewSubscription"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                      >
                        Renew Subscription
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </React.Fragment>
            </form>
            <Typography variant="h6" >Subscriber Details</Typography>
            <Grid container spacing={3}
              className={classes.form}
              component={Paper} elevation={6}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={12} sm={6} lg={4}>
                <DisplaySubscriberDetails subData={sD} />
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <DisplayLastSubscription lastSubscriptionData={(sD.subscriptions)[0]} />
              </Grid>

            </Grid>
            <BackButton />
          </>
        </CssBaseline>
      </Container>
    </Grid>
  </>
  );
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

function DisplayLastSubscription(props) {
  const s = props.lastSubscriptionData
  const styles = useStyles();
  return (
    <Card variant="outlined" >
      <Typography variant="button"
        align="left" color="textSecondary"
      >
        {makeColumn(<b>Last Subscription Details</b>)}
        <Divider variant="fullWidth" />
        {makeColumn("Subscriber Code (SC)", s.subid)}
        <Divider variant="fullWidth" />
        {makeColumn("Last Subscription Id", s.subscriptionid)}
        <Divider variant="fullWidth" />
        {makeColumn("Plan", <>{s.subplan} Years</>)}
        <Divider variant="fullWidth" />
        {makeColumn("Valid for Volume Number", <> {s.substartvol} --{'>'} {s.subendvol}</>)}
        <Divider variant="fullWidth" />
        {makeColumn("Distributor Id", s.subdistid)}
        <Divider variant="fullWidth" />
        {makeColumn("Slip No.", s.subslipnum)}
        <Divider variant="fullWidth" />
        {makeColumn("Subscription Type", s.subtype)}
        <Divider variant="fullWidth" />
        {makeColumn("Subscription Medium", s.submedium)}
      </Typography>
    </Card>
  );
}

function DisplaySubscriberDetails(props) {
  const s = props.subData
  const styles = useStyles();
  return (<>
    <Card variant="outlined" >
      <Typography variant="button"
        align="left" color="textSecondary"
      >
        {makeColumn(<b>Subscriber Address Details</b>)}
        <Divider variant="fullWidth" />
        {makeColumn("Name", s.subName)}
        <Divider variant="fullWidth" />
        {makeColumn("About", s.subAbout)}
        <Divider variant="fullWidth" />
        {makeColumn("Address Line 1", s.subAdd1)}
        <Divider variant="fullWidth" />
        {makeColumn("Address Line 2", s.subAdd2)}
        <Divider variant="fullWidth" />
        {makeColumn("Post", s.subPost)}
        <Divider variant="fullWidth" />
        {makeColumn("City", s.subCity)}
        <Divider variant="fullWidth" />
        {makeColumn("State", s.subState)}
        <Divider variant="fullWidth" />
        {makeColumn("Pincode", s.subPincode)}
        <Divider variant="fullWidth" />
        {makeColumn("Mobile", s.subPhone)}
      </Typography>
    </Card>
  </>);
}