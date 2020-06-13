import React from 'react';
import {useForm} from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useNavigate } from "@reach/router"
import FlowerDiv from './FlowerDiv/FlowerDiv';




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
        padding: theme.spacing(5),
      },
       backgroundColor: '#ebf5ab'

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
  
export default function TestLoginForm() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    navigate("/testLoginResult/", {state:{userAuthData:data }})
  };

  const classes = useStyles();

  function RenderHeading(props) {
    return (
      <Grid item alignItems="center" >
        <Typography variant="h2" component="h3"
          className={classes.heading} align="center">
          Login Details
            </Typography>
    <FlowerDiv/>
      </Grid>)
  }

  function RenderForm() {
    return (
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
                id="userId"
                name="userId"
                label="User Name"
                fullWidth
                autoComplete="userId"
              />
            </Grid>
            <Grid item>
              <TextField
                inputRef={register}
                id="password"
                name="password"
                label="Password"
                autoComplete="password"
              />
            </Grid>
            <Grid container justify="center">
              <Grid item >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  LOGIN
                  </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
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
                  <RenderHeading />
                  <RenderForm />
                </>
        </CssBaseline>
      </Grid>
    </Grid>
  );
}
