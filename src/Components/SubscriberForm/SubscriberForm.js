import React, { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';


import AddUserResult from '../User/AddUser';


const useStyles = makeStyles(theme => (
  {
    root: {
      height: '70vh',
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
      backgroundColor: '#f0f5ce'
    },
    form: {
      // width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


export default function SubscriberForm() {
  const { register, handleSubmit } = useForm();
  const [user, setUser] = useState('');
  const [userResult, setUserResult] = useState(null);
  const onSubmit = data => {
    setUser(data);
    console.log(data);
  };
  useEffect(() => {
    if (user !== '') {
      setUserResult(<AddUserResult payload={user} />);
      setUser('');
    }
  }, [user]);

  const classes = useStyles();

  function RenderResult(props) {
    // conditionally render result
    if (props.result !== null) {
      return <>{userResult}</>
    }
    return (
      <Container maxWidth="xl" className={classes.paper}  >

        <Typography variant="h4" color="textPrimary" align="center">
          Subscriber Address Details | सदस्य पता विवरण
    </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" className={classes.bgColor} >

      <Container maxWidth='xl' className={classes.paper}  >
        <CssBaseline>
          <>
            <RenderResult result={userResult} />
            <form onSubmit={handleSubmit(onSubmit)} >
              <React.Fragment>
                <Grid container spacing={3}
                  className={classes.form}
                  component={Paper} elevation={6}
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <Grid item xs={6} sm={4}>
                    <TextField
                      inputRef={register}
                      required
                      id="custSaluation"
                      name="custSaluation"
                      label="Saluation"
                      fullWidth
                      autoComplete="custSaluation"
                    />
                  </Grid>
                  <Grid container
                    spacing={2}
                    className={classes.names}
                    // component={Paper} // elevation={6}
                    direction="row"
                    justify="flex-start"
                    alignItems="stretch" >

                    <Grid item xs={9} sm={3}>
                      <TextField
                        inputRef={register}
                        required
                        id="custFname"
                        name="custFname"
                        label="First name"
                        fullWidth
                        autoComplete="custFname"
                      />
                    </Grid>
                    <Grid item xs={9} sm={3}>
                      <TextField
                        inputRef={register}
                        id="custMname"
                        name="custMname"
                        label="Middle name"
                        fullWidth
                        autoComplete="custMname"
                      />
                    </Grid>
                    <Grid item xs={9} sm={3}>
                      <TextField
                        inputRef={register}
                        required
                        id="custLname"
                        name="custLname"
                        label="Last name"
                        fullWidth
                        autoComplete="custLname"
                      />
                    </Grid>
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
                        required
                        id="custAbout"
                        name="custAbout"
                        label="About"
                        fullWidth
                        autoComplete="custAbout"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        inputRef={register}
                        required
                        id="custAdd1"
                        name="custAdd1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="custAdd1"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        inputRef={register}
                        id="custAdd2"
                        name="custAdd2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="custAdd2"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      inputRef={register}
                      required
                      id="custPost"
                      name="custPost"
                      label="Post"
                      fullWidth
                      autoComplete="custPost"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      inputRef={register}
                      required
                      id="custCity"
                      name="custCity"
                      label="City"
                      fullWidth
                      autoComplete="custCity"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      inputRef={register}
                      required
                      id="custState"
                      name="custState"
                      label="State"
                      fullWidth
                      autoComplete="custState"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      inputRef={register}
                      id="custPincode"
                      name="custPincode"
                      label="Postal code"
                      fullWidth
                      autoComplete="custPincode"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      inputRef={register}
                      id="custPhone"
                      name="custPhone"
                      label="Phone"
                      fullWidth
                      autoComplete="custPhone"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} >
                    <Button
                      type="submit"
                      name="createNewCustomer"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Create New Customer
                  </Button>
                  </Grid>
                </Grid>
              </React.Fragment>
            </form>
          </>
        </CssBaseline>
      </Container>
    </Container>
  );
}
