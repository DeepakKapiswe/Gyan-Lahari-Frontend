import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { navigate } from '@reach/router';


import UpdateDistributorResult from '../UpdateDistributor/UpdateDistributor';
import BackButton from '../BackButton/BackButton';


const useStyles = makeStyles(theme => (
  {
    root: {
    },
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
        padding:theme.spacing(15),},
      // backgroundColor: '#f0f5ce'
      // backgroundColor: '#E6FFC4',
      background: 'linear-gradient(to bottom,  rgba(255,197,120,1) 6%,rgba(255,197,120,1) 17%,rgba(255,197,120,1) 29%,rgba(255,197,120,1) 29%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 49%,rgba(255,197,120,1) 60%,rgba(255,197,120,1) 60%,rgba(251,157,35,1) 97%,rgba(251,157,35,1) 98%,rgba(251,157,35,1) 98%,rgba(251,157,35,1) 100%,rgba(251,157,35,1) 101%)',
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      // background: 'linear-gradient(to right, #190A05, #870000)'
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

export default function DistributorEditForm(props) {
  const oldDetails = 
    (props.location.state !== null ) ? props.location.state.distributor : null;
  const [dD, setDD]                 = useState(oldDetails);
  const { register, handleSubmit }  = useForm();
  const [userResult, setUserResult] = useState(null);
  const onSubmit = data => {
    setUserResult(<UpdateDistributorResult payload={{...dD, ...data }} />);
    navigate(-1);
  };

  const onReset = () => {
    setDD(oldDetails);
  }

  const classes = useStyles();

  function RenderResult(props) {
    // conditionally render result
    if (props.result !== null) {
      return ( 
      <div className={classes.heading}>
        {userResult}
      </div>
      )
    }
    return (
      <Grid item alignItems="center" >

      <Typography variant="h2" component="h3"
        
        className={classes.heading} align="center">
        Edit Distributor Details
            </Typography>

      <Typography variant="h2" component="h3"
        className={classes.heading} align="center">
        वितरक विवरण सुधार
            </Typography>
    </Grid>
    );
  }
  
  if (dD == null) {return <h1>Bad Request</h1>}
  return (
    <Grid
    container xs
    className={classes.bgColor}
    direction="row-reverse"
    justify="center"
    alignItems="center"
  >
    <Grid  className={classes.paper} >
      <CssBaseline>
        <>
          <RenderResult result={userResult} />
          <Container maxWidth='sm'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}
                className={classes.form}
                component={Paper} elevation={6}
                direction="column"
                justify="flex-start"
                alignItems="stretch"
              >
                <Grid item>
                  <TextField
                    inputRef={register}
                    required
                    type="number"
                    id="distId"
                    name="distId"
                    label="Distributor Id"
                    autoComplete="distId"
                    defaultValue={dD.distId}
                    />
                </Grid>
                  <Grid item>
                    <TextField
                      inputRef={register}
                      required
                      id="distName"
                      name="distName"
                      label="Name"
                      fullWidth
                      autoComplete="distName"
                      defaultValue={dD.distName}
                      />
                  </Grid>

                  <Grid item>
                    <TextField
                      inputRef={register}
                      id="distAdd"
                      name="distAdd"
                      label="Address"
                      fullWidth
                      autoComplete="distAdd"
                      defaultValue={dD.distAdd}
                      />
                  </Grid>
                <Grid item >
                  <TextField
                    inputRef={register}
                    required
                    id="distCity"
                    name="distCity"
                    label="City"
                    fullWidth
                    autoComplete="distCity"
                    defaultValue={dD.distCity}
                    />
                </Grid>
                <Grid item>
                  <TextField
                    inputRef={register}
                    id="distPhone"
                    name="distPhone"
                    label="Phone"
                    fullWidth
                    autoComplete="distPhone"
                    defaultValue={dD.distPhone}
                    />
                </Grid>
                <Grid container
                    justify="space-between"
                    alignItems="stretch">
                <Grid item >
                        <Button
                          type="reset"
                          name="Reset"
                           //fullWidth
                          variant="contained"
                          color="secondry"
                          onClick ={onReset}
                          className={classes.submit}
                          >
                          Undo Changes
                      </Button>
                </Grid>

                  <Grid item >
                  <Button
                    type="submit"
                    name="UpdateDistributor"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick ={onReset}
                    className={classes.submit}
                    >
                    Update Distributor
                </Button>
                    </Grid>
                </Grid>
              </Grid>
          </form>
            <BackButton/>
          </Container>
        </>
      </CssBaseline>
    </Grid>
</Grid>
);
}
