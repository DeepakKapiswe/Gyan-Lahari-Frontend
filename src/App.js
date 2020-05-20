import React, { Suspense, useEffect } from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './Theme';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import ToolBar from '@material-ui/core/Toolbar';

import { Router } from "@reach/router";

import ButtonLink from './Common/ButtonLink';
import LinearProgress from './Components/Progress/LinearProgressBar';
import Footer from './Components/Footer/Footer';
import PdfView from './Common/PdfViewer/PdfViewer';
import PdfDownload from './Common/PdfDownload/PdfDownload';
import Logo from './Components/Logo/Logo';


const Login = React.lazy(() => import('./Components/Login/Login'));
const Users = React.lazy(() => import('./Components/AddSubscriber/User'));
const ViewAllSubscribers = React.lazy(() => import('./Components/ViewSubscriber/ViewAllSubscribers'));
const ViewAllDistributors = React.lazy(() => import('./Components/ViewDistributor/ViewAllDistributors'));
const DistributorDetails = React.lazy(() => import('./Components/DistributorDetails/DistributorDetails'));
const SubscriberForm = React.lazy(() => import('./Components/SubscriberForm/SubscriberForm'));
const SubscriberEditForm = React.lazy(() => import('./Components/SubscriberEditForm/SubscriberEditForm'));
const DistributorEditForm = React.lazy(() => import('./Components/DistributorEditForm/DistributorEditForm'));
const DistributorForm = React.lazy(() => import('./Components/DistributorForm/DistributorForm'));
const SearchForm = React.lazy(() => import ('./Components/SearchForm/SearchForm'));
const SearchResult = React.lazy(() => import('./Components/SearchResult/SearchResult'));
const DistributionList = React.lazy(() => import('./Components/DistributionList/DistributionList'));
const ExpiryList = React.lazy(() => import('./Components/ExpiryList/ExpiryList'));
const BulkDistributionList = React.lazy(() => import('./Components/BulkDistributionList/BulkDistributionList'));
const BulkExpiryList = React.lazy(() => import('./Components/BulkExpiryList/BulkExpiryList'));
const DistributionListForm = React.lazy(() => import('./Components/DistributionListForm/DistributionListForm'));
const ExpiryListForm = React.lazy(() => import('./Components/ExpiryListForm/ExpiryListForm'));
const BulkDistributionListForm = React.lazy(() => import('./Components/BulkDistributionListForm/BulkDistributionListForm'));
const BulkExpiryListForm = React.lazy(() => import('./Components/BulkExpiryListForm/BulkExpiryListForm'));

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
    [theme.breakpoints.up('sm')]: {
        fontSize: '6rem',
      },
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  appBar: {
    paddingTop: theme.spacing(1),
  },
  appColor: {
    background: '#050355'
  },
  toolColor: {
    background: '#e4ded4'
  }
  
  
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
    <Suspense>
    <ThemeProvider theme={theme}>
      <div className={classes.main}>
      <CssBaseline />
        <AppBar
          position="sticky"
          color="primary"
          elevation={6}
          className={classes.appColor}
        >
          <ToolBar>
            <Logo/>
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
          </ToolBar>
        </AppBar>
        <React.Fragment className={classes.toolColor}>
        <AppBar
          position="static"
          className={classes.toolColor}
        >
            <Grid container
              className={classes.toolbar}
              alignItems="baseline"
              justify="center"
            >
              <ButtonLink to="/" label="Home" />
              <Divider orientation="vertical" flexItem />
              <ButtonLink to="/addNewSubscriber" label="Add Subscriber" />
              <Divider orientation="vertical" flexItem />
              <ButtonLink to="/addNewDistributor" label="Add Distributor" />
              <Divider orientation="vertical" flexItem />
              <ButtonLink to="/allSubscribers" label="All Subscribers" />
              <Divider orientation="vertical" flexItem />
              <ButtonLink to="/allDistributors" label="All Distributors" />
              <Divider orientation="vertical" flexItem />
              <ButtonLink to="/viewDistributor" label="View Distributor" />
              <Divider orientation="vertical" flexItem />
              <ButtonLink to="/searchSubscriber" label="Search Subscriber" />
              <Divider orientation="vertical" flexItem />
              <ButtonLink to="/bulkDistributionListForm" label="Print Distribution List" />
              <Divider orientation="vertical" flexItem />
              <ButtonLink to="/bulkExpiryListForm" label="Print Expiry List" />
              <Divider orientation="vertical" flexItem />
              <Router>
                <ButtonLink to="/login" label="Sign In" path="/*"  />
                <ButtonLink to="/" label="Sign Out" path="user/*" />
              </Router>
            </Grid>
        </AppBar>
        </React.Fragment>
        <Suspense
          fallback={<LinearProgress />}>
          <Router>
            <Login path="login" />
            <Home path="/"><Logo/></Home>
            <SubscriberForm path="/addNewSubscriber" />
            <DistributorForm path="/addNewDistributor" />
            <DistributorDetails path="/viewDistributor" />
            <SearchForm path="/searchSubscriber" />
            <Users path="/user/:userId" />
            <ViewAllSubscribers path="/allSubscribers" />
            <ViewAllDistributors path="/allDistributors" />
            <SearchResult path="/searchResult" />
            {/* Both ^ V requires state object */}
            <SubscriberEditForm path="/editSubscriber" /> 
            <DistributorEditForm path="/editDistributor" /> 
            <DistributionList path="/distributionList" />
            <BulkDistributionList path="/bulkDistributionList" />
            <DistributionListForm path="/distributionListForm" />
            <BulkDistributionListForm path="/bulkDistributionListForm" />
            <ExpiryList path="/expiryList" />
            <BulkExpiryList path="/bulkExpiryList" />
            <ExpiryListForm path="/expiryListForm" />
            <BulkExpiryListForm path="/bulkExpiryListForm" />
            <PdfView path="/viewPdf" />
            <PdfDownload path="/downloadPdf" />
          </Router>
        </Suspense>
      </div>
      <Footer/>
    </ThemeProvider >
        </Suspense>
  );
}

export default App;
