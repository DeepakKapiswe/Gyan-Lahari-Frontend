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


import AddDistributorResult from '../AddDistributor/AddDistributor';
import FlowerDiv from '../FlowerDiv/FlowerDiv';


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
        padding: theme.spacing(15)
      }
      , backgroundColor: '#ebf5ab',
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
    center: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '50%',
    }
  }));

export default function DistributorForm() {
  const { register, handleSubmit } = useForm();
  const [distributor, setDistributor] = useState('');
  const [distributorResult, setDistributorResult] = useState(null);
  const onSubmit = data => {
    setDistributor(data);
    console.log(data);
  };
  useEffect(() => {
    if (distributor !== '') {
      setDistributorResult(<AddDistributorResult payload={distributor} />);
      setDistributor('');
    }
  }, [distributor]);

  const classes = useStyles();

  function RenderResult(props) {
    // conditionally render result
    if (props.result !== null) {
      return <>{distributorResult}</>
    }
    return (
      <>
        <Grid item alignItems="center" >

          <Typography variant="h2" component="h3"
            className={classes.heading} align="center">
            New Distributor Details
      </Typography>

          <Typography variant="h2" component="h3"
            className={classes.heading} align="center">
            नये वितरक का विवरण
      </Typography>
          <FlowerDiv />

        </Grid>
      </>
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
      <Grid className={classes.paper} >
        <CssBaseline>
          <>
            <RenderResult result={distributorResult} />
            <Container maxWidth='sm'>
              <form onSubmit={handleSubmit(onSubmit)} >
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
                    />
                  </Grid>
                  <Grid container justify="center">

                    <Grid item >
                      <Button
                        type="submit"
                        name="createNewDistributor"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        Create New Distributor
                  </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Container>
          </>
        </CssBaseline>
      </Grid>
    </Grid>
  );
}
