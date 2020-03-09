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
import Fab from '@material-ui/core/Fab';


import FindSubscriberResult from '../FindSubscriber/FindSubscriber';

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
      // backgroundColor: '#f0f5ce'
      background: 'linear-gradient(to right, #190A05, #870000)'

    },
    heading: {
      color: '#ffffff',
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

export default function SearchForm() {
  const { register, handleSubmit } = useForm();
  const [query, setQuery] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const onSubmit = data => {
    setQuery(data);
  };
  const onReset = () => {
    setQueryResult(null);
  };
  useEffect(() => {
    if (query !== '') {
      setQueryResult(<FindSubscriberResult payload={query} />);
      setQuery('');
    }
  }, [query]);

  const classes = useStyles();

  function RefreshButton() {
    return (
      <Fab 
        color="primary" 
        variant="extended"
        type="reset"
        name="RefreshButton"
        fullWidth
        onClick={onReset}
      >
      <Typography variant="Button">Reset</Typography>
      </Fab>
    )
  }

  function RenderResult(props) {
    const result = props.result;
    return (
     <> {result}</>
    )
  }

  function RenderHeading(props) {
    return (
      <Grid item alignItems="center" >
        <Typography variant="h2" component="h3"
          className={classes.heading} align="center">
          Search Details
            </Typography>
        <Typography variant="h2" component="h3"
          className={classes.heading} align="center">
          खोज विवरण
            </Typography>
      </Grid>)
  }

  function RenderForm() {
    return (
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
                id="sqSubName"
                name="sqSubName"
                label="Name"
                fullWidth
                autoComplete="sqSubName"
              />
            </Grid>
            <Grid item>
              <TextField
                inputRef={register}
                // required
                hidden
                type="number"
                id="sqLimit"
                name="sqLimit"
                defaultValue="20"
                label="Max Result Items"
                autoComplete="sqLimit"
              />
            </Grid>
            <Grid container justify="center">
              <Grid item >
                <Button
                  type="submit"
                  name="searchSubscriber"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Search Subscriber
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
            {(queryResult !== null) ?
              (<>
                <RenderResult result={queryResult} />
                <RefreshButton/>
                </>
              )
              : 
              (
                <>
                  <RenderHeading result={queryResult} />
                  <RenderForm />
                </>
              )
            }
          </>
        </CssBaseline>
      </Grid>
    </Grid>
  );
}
