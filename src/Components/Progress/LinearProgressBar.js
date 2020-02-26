import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(5),
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(10),
    },
  },
  
  heading: {
    padding: theme.spacing(5),
    textAlign: 'center',
    color: '#9cb3b8',
    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem',
    },
    [theme.breakpoints.between('sm','md')]: {
      fontSize: '3rem',
      padding: theme.spacing(0),
    },
  },
}));

export default function LinearProgressBar() {
  const classes = useStyles();

  return (
    <Grid container xs
      direction="column"
      justify="flex-end"
      alignItems="center">

      <Grid item>
        <Typography variant="h3" component="h3"
          className={classes.heading}>
          Fetching Data...
        </Typography>
      </Grid>
      <Grid item className={classes.root}>
        <LinearProgress />
        <LinearProgress color="secondary" />
        <LinearProgress />
      </Grid>
    </Grid>
  );
}