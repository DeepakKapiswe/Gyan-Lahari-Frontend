import React, { Suspense, useEffect } from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './Theme';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


import { Router } from "@reach/router";

import ButtonLink from './Common/ButtonLink';
import LinearProgress from './Components/Progress/LinearProgressBar';
import LinearProgressBar from './Components/Progress/LinearProgressBar';

const Login = React.lazy(() => import('./Components/Login/Login'));
const Users = React.lazy(() => import('./Components/AddSubscriber/User'));
const ViewAllSubscribers = React.lazy(() => import('./Components/ViewSubscriber/ViewAllSubscribers'));
const ViewAllDistributors = React.lazy(() => import('./Components/ViewDistributor/ViewAllDistributors'));
const SubscriberDetails = React.lazy(() => import('./Components/SubscriberDetails/SubscriberDetails'));
const DistributorDetails = React.lazy(() => import('./Components/DistributorDetails/DistributorDetails'));
const SubscriberForm = React.lazy(() => import('./Components/SubscriberForm/SubscriberForm'));
const DistributorForm = React.lazy(() => import('./Components/DistributorForm/DistributorForm'));
const SearchForm = React.lazy(() => import ('./Components/SearchForm/SearchForm'));

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    alignItems: 'flex-start',
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  appBar: {
    paddingTop: theme.spacing(1),
  },
}));

function Home(){
  return <h1> Dummy Home</h1>;
}

function App() {
  const classes = useStyles();

  useEffect(() => {
    document.title = `ज्ञान लहरी`;
  });
  return (
    <ThemeProvider theme={theme}>
      <>
        <AppBar
          position="sticky"
          color="primary"
          elevation={6}
        >
          <Grid
            className={classes.appBar}
            direction="row"
            container
            justify="space-evenly"
            alignItems="baseline"
          >
            <Grid item>
              <Typography variant="h3"
                className={classes.title}
              >
                ज्ञान लहरी
              </Typography>
            </Grid>
          </Grid>
        </AppBar>
        <AppBar
          color="default"
          position="static"
        >
          <Suspense
            fallback={<LinearProgress />}>

            <Grid container
              component={Typography}
              variant="subtitle2"
              className={classes.toolbar}
              justify="space-between"
              alignItems="baseline"
            >
              <ButtonLink to="/" label="Home" />
              <ButtonLink to="addNewSubscriber" label="Add Subscriber" />
              <ButtonLink to="addNewDistributor" label="Add Distributor" />
              <ButtonLink to="allSubscribers" label="All Subscribers" />
              <ButtonLink to="allDistributors" label="All Distributors" />
              <ButtonLink to="viewSubscriber" label="View Subscriber" />
              <ButtonLink to="viewDistributor" label="View Distributor" />
              <ButtonLink to="searchSubscriber" label="Search Subscriber" />
              <Router>
                <ButtonLink to="login" label="Sign In" path="/*"  />
                <ButtonLink to="/" label="Sign Out" path="user/*" />
              </Router>
            </Grid>
          </Suspense>
        </AppBar>
        <Suspense
          fallback={<LinearProgressBar />}>
          <Router>
            <Login path="login" />
            <Home path="/"/>
            <SubscriberForm path="addNewSubscriber" />
            <DistributorForm path="addNewDistributor" />
            <SubscriberDetails path="viewSubscriber" />
            <DistributorDetails path="viewDistributor" />
            <SearchForm path="searchSubscriber" />
            <Users path="user/:userId" />
            <ViewAllSubscribers path="allSubscribers" />
            <ViewAllDistributors path="allDistributors" />
          </Router>
        </Suspense>
      </>
    </ThemeProvider >
  );
}

export default App;
