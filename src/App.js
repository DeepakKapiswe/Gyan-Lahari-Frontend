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
const Users = React.lazy(() => import('./Components/User/User'));
const ContactUs = React.lazy(() => import('./Components/ContactUs/ContactUs'));
const ViewAllSubscribers = React.lazy(() => import('./Components/ViewSubscriber/ViewAllSubscribers'));

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
    // paddingTop: theme.spacing(1),
    //  paddingBottom: theme.spacing(1),
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
  appBar1: {
    //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    // background: 'rgb(207,223,118)',
    background: 'linear-gradient(90deg, rgba(207,223,118,0.6110819327731092) 0%, rgba(217,237,166,0.5970763305322129) 38%, rgba(235,246,192,0.6306897759103641) 83%)',
    borderRadius: 0,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'Black',
    padding: '0 30px',
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
          position="">
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
            <Users path="user/:userId" />
            <ViewAllSubscribers path="allsubscribers" />
          </Router>
        </Suspense>
      </>
    </ThemeProvider >
  );
}

export default App;
