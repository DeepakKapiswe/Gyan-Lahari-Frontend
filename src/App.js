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

const Home = React.lazy(() => import('./Components/Home/Home'));
const Login = React.lazy(() => import('./Components/Login/Login'));
const Users = React.lazy(() => import('./Components/AddSubscriber/User'));
const ContactUs = React.lazy(() => import('./Components/ContactUs/ContactUs'));
const ViewAllSubscribers = React.lazy(() => import('./Components/ViewSubscriber/ViewAllSubscribers'));
const SubscriberDetails = React.lazy(() => import('./Components/SubscriberDetails/SubscriberDetails'));
const SubscriberForm = React.lazy(() => import('./Components/SubscriberForm/SubscriberForm'));

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
            <Grid item>
              <Typography variant="h4"
                className={classes.title}>
                श्री कबीर ज्ञान प्रकाशन केंद्र
    </Typography>
            </Grid>
          </Grid>

        </AppBar>

        <AppBar
          color="default"
          position="static" >
          <Suspense
            fallback={<p> Loading...</p>}>

            <Grid container
              component={Typography}
              variant="subtitle2"
              className={classes.toolbar}
              justify="space-between"
              alignItems="baseline"
            >
              <ButtonLink to="/" label="Home" />
              <ButtonLink to="addNew" label="Add New Subscriber" />
              <ButtonLink to="allsubscribers" label="View All Subscribers" />
              <ButtonLink to="onesubscriber" label="View Subscriber" />
              <ButtonLink to="contactus" label="Contact Us" />
              <Router>
                <ButtonLink to="login" label="Sign In" path="/*" />
                <ButtonLink to="/" label="Sign Out" path="user/*" />
              </Router>
            </Grid>
          </Suspense>
        </AppBar>
        <Suspense
          fallback={<p> Loading...</p>}>
          <Router>
            <Login path="login" />
            <Home path="/" />
            <ContactUs path="contactus" />
            <SubscriberForm path="addNew" />
            <SubscriberDetails path="onesubscriber" />
            <Users path="user/:userId" />
            <ViewAllSubscribers path="allsubscribers" />
          </Router>
        </Suspense>
      </>
    </ThemeProvider >
  );
}

export default App;
