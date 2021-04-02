import React, { useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
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

import FlowerDiv from '../FlowerDiv/FlowerDiv';
import { useSaveLastLocation, useSaveNextLocation } from '../../Hooks/SaveLocation';


const useStyles = makeStyles(theme => (
  {
    root: {
    },
    paper: {
      margin: theme.spacing(0, 0, 2, 0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    names: {
      margin: theme.spacing(0, 0, 0, 1),
    },
    bgColor: {
      flexGrow: 1,
      [theme.breakpoints.up('md')]: {
        padding:theme.spacing(15),},
       backgroundColor: '#ebf5ab',
      
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
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function SubscriberForm() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [endVol, setEndVol] = useState(0);
  const [subscriptionType, setSubscriptionType] = useState(0);
  const [startVol, setStartVol] = useState(0);
  const saveLastLocation = useSaveLastLocation();
  const saveNextLocation = useSaveNextLocation();
  saveLastLocation();


  
  const onSubmit = data => {
    data.subStartVol = data.subStartVol*1;
    data.subEndVol = data.subEndVol*1;
    data.subSubscriptionType = data.subSubscriptionType*1; 
    data.subSlipNum = data.subSlipNum*1;
    saveNextLocation("/patrika/addSubscriberResult", {state:{newSubscriberData:data }});
    navigate("/patrika/addSubscriberResult", {state:{newSubscriberData:data }})
  };

  const handleStartVolChange = (event) => {
    setStartVol(event.target.value);
  };

  const handleSubscriptionTypeChange = (event) => {
    setSubscriptionType(event.target.value);
  };

  useEffect(() => {
    if ( startVol !== 0  && subscriptionType !== 0) {
    setEndVol(startVol*1 + subscriptionType*4 - 1);
    }
    else {
      setEndVol(0);
      }
  }, [startVol, subscriptionType]);

  const classes = useStyles();

  function RenderResult(props) {
    return (
      <Grid item >

      <Typography variant="h2" component="h3"
        
        className={classes.heading} align="center">
        Subscription Details
            </Typography>

      <Typography variant="h2" component="h3"
        className={classes.heading} align="center">
        सदस्यता विवरण
            </Typography>
            <FlowerDiv/>
    </Grid>
    );
  }

  return (
      <Grid
      container xs
      className={classes.bgColor}
      direction="row-reverse"
      justify="center"
      alignItems="center"
    >
      <Container maxWidth='xl' className={classes.paper}  >
        <CssBaseline>
          <>
            <RenderResult  />
            <form onSubmit={handleSubmit(onSubmit)} >
              <React.Fragment>
                <Grid container spacing={3}
                  className={classes.form}
                  component={Paper} elevation={6}
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  >
                  <Grid item xs={6} sm={4} lg={3}>
                    <TextField
                      inputRef={register}
                      required
                      type="number"
                      id="subStartVol"
                      name="subStartVol"
                      label="Starting Volume"
                      autoComplete="subStartVol"
                      onChange={handleStartVolChange}
                      />
                  </Grid>
                  <Grid item xs={6} sm={4} lg={3}>
                    <NativeSelect
                      native
                      inputRef={register}
                      id="subSubscriptionType"
                      name="subSubscriptionType"
                      required
                      label="Subscription Type"
                      onChange={handleSubscriptionTypeChange}
                      >
                      <option value={0} />
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
                      required
                      type="number"
                      id="subEndVol"
                      value = {endVol}
                      disabled
                      name="subEndVol"
                      label="Ending Volume"
                      autoComplete="subEndVol"
                      />
                  </Grid>
                  <Grid item xs={6} sm={4} lg={3}>
                    <TextField
                      inputRef={register}
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
                      required
                      type="number"
                      id="subDistId"
                      name="subDistId"
                      label="Distributor Id"
                      autoComplete="subDistId"
                      />
                  </Grid>
                    <Grid item xs={12} sm={4} >
                      <TextField
                        inputRef={register}
                        required
                        id="subName"
                        name="subName"
                        label="Subscriber Name"
                        fullWidth
                        autoComplete="subName"
                        />
                    </Grid>
                   
                  <Grid container
                    spacing={2}
                    className={classes.names}
                    direction="row"
                    justify="flex-start"
                    alignItems="stretch" >

                    <Grid item xs={12} sm={4}>
                      <TextField
                        inputRef={register}
                        // required
                        id="subAbout"
                        name="subAbout"
                        label="About"
                        fullWidth
                        autoComplete="subAbout"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        inputRef={register}
                        // required
                        id="subAdd1"
                        name="subAdd1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="subAdd1"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        inputRef={register}
                        id="subAdd2"
                        name="subAdd2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="subAdd2"
                        />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      inputRef={register}
                      // required
                      id="subPost"
                      name="subPost"
                      label="Post"
                      fullWidth
                      autoComplete="subPost"
                      />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      inputRef={register}
                      // required
                      id="subCity"
                      name="subCity"
                      label="City"
                      fullWidth
                      autoComplete="subCity"
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      inputRef={register}
                      // required
                      id="subState"
                      name="subState"
                      label="State"
                      fullWidth
                      autoComplete="subState"
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      // required
                      type="number"
                      inputRef={register}
                      id="subPincode"
                      name="subPincode"
                      label="Postal code"
                      fullWidth
                      autoComplete="subPincode"
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      inputRef={register}
                      type="number"
                      id="subPhone"
                      name="subPhone"
                      label="Phone"
                      fullWidth
                      autoComplete="subPhone"
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      inputRef={register}
                      id="subRemark"
                      name="subRemark"
                      label="Remark"
                      fullWidth
                      autoComplete="subRemark"
                      />
                  </Grid>
                  <Grid container justify="center">

                  <Grid item xs={12} sm={6} >
                    <Button
                      type="submit"
                      name="createNewCustomer"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      >
                      Create New Subscriber
                  </Button>
                      </Grid>
                  </Grid>
                </Grid>
              </React.Fragment>
            </form>
          </>
        </CssBaseline>
      </Container>
  </Grid>
  );
}
