import React, { lazy, Suspense, useEffect} from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';

import { Router, Link, Redirect } from "@reach/router";

import LinearProgress from './components/Progress/LinearProgressBar';
import Footer from './components/Footer/Footer';
import PdfView from './common/PdfViewer/PdfViewer';
import PdfDownload from './common/PdfDownload/PdfDownload';
import Logo from './components/Logo/Logo';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Authorised} from './common/Authorization';
import * as auth from './common/Authorization';
import LoginPrompt from './components/LoginPrompt/LoginPrompt';
import Home from './components/Home/Home';
import { useAuth } from './Hooks/AuthHooks';

const Login = lazy(() => import('./components/Login/Login.jsx'));
const Logout = lazy(() => import('./components/Logout/Logout'));
const LoginForm = lazy(() => import('./components/LoginForm/LoginForm'));
const LoginBackdrop = lazy(() => import('./components/LoginBackdrop/LoginBackdrop'));
const LoginResult = lazy(() => import('./components/LoginResult/LoginResult'));
const ViewAllSubscribers = lazy(() => import('./components/ViewSubscriber/ViewAllSubscribers'));
const ViewAllDistributors = lazy(() => import('./components/ViewDistributor/ViewAllDistributors'));
const ViewAddedDistributor = lazy(() => import('./components/ViewDistributor/ViewDistributor'));

const ViewSubscriberApplication = lazy(() => import('./components/ViewSubscriberApplication/ViewSubscriberApplication'));
const ViewAllSubscriberApplications = lazy(() => import('./components/ViewSubscriberApplication/ViewAllSubscriberApplications'));
const ViewSubscriber = lazy(() => import('./components/ViewSubscriber/ViewSubscriber'));
const AddResult = lazy(() => import('./components/AddResult/AddResult'));
const AddDistributorResult = lazy(() => import('./components/AddDistributor/AddDistributorResult'));
const SubscriberForm = lazy(() => import('./components/SubscriberForm/SubscriberForm'));
const SubscriberDashboard = lazy(() => import('./components/SubscriberDashboard/SubscriberDashboard'));
const DistributorDashboard = lazy(() => import('./components/DistributorDashboard/DistributorDashboard'));
const SubscriberEditForm = lazy(() => import('./components/SubscriberEditForm/SubscriberEditForm'));
const DistributorEditForm = lazy(() => import('./components/DistributorEditForm/DistributorEditForm'));
const DistributorForm = lazy(() => import('./components/DistributorForm/DistributorForm'));
const SearchForm = lazy(() => import('./components/SearchForm/SearchForm'));
const SearchResult = lazy(() => import('./components/SearchResult/SearchResult'));
const DistributionList = lazy(() => import('./components/DistributionList/DistributionList'));
const ExpiryList = lazy(() => import('./components/ExpiryList/ExpiryList'));
const BulkDistributionList = lazy(() => import('./components/BulkDistributionList/BulkDistributionList'));
const BulkExpiryList = lazy(() => import('./components/BulkExpiryList/BulkExpiryList'));
const DistributionListForm = lazy(() => import('./components/DistributionListForm/DistributionListForm'));
const ExpiryListForm = lazy(() => import('./components/ExpiryListForm/ExpiryListForm'));
const BulkDistributionListForm = lazy(() => import('./components/BulkDistributionListForm/BulkDistributionListForm'));
const BulkExpiryListForm = lazy(() => import('./components/BulkExpiryListForm/BulkExpiryListForm'));
const RecentlyAddedForm = lazy(() => import('./components/RecentlyAddedForm/RecentlyAddedForm'));
const RecentlyAddedResult = lazy(() => import('./components/RecentlyAddedResult/RecentlyAddedResult'));
const FilterSubscriberForm = lazy (() => import('./components/FilterSubscriberForm/FilterSubscriberForm'));
const FilterResult = lazy (() => import('./components/FilterSubscriberResult/FilterSubscriberResult'));


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({

  title: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      fontSize: '6rem',
    },
  },
  drawerTitle: {
    fontSize: '3rem',
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(5),
      flexGrow: 1,
      background: '#050355',
      color: 'white',
      
    },
  },

  root: {
    display: 'list-item',
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    overflow: 'auto',
  },
  appBar: {
    background: '#050355',
    zIndex: theme.zIndex.drawer + 1,
  },
  titleBar: {
    paddingTop: theme.spacing(1),

  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    // background: '#e4ded4',
    background: '#defaf3',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    display: 'list-item',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  buttonText: {
    color: '#050505'
  },
  link: {
    color: '#defaf3'
  },

}));

function ListLink(props) {
  const classes = useStyles();
  return (
    <Link to={props.to} className={classes.link}>
      <ListItem button className={classes.buttonText}>
        <h3>{props.label.toUpperCase()}</h3>
        {props.icon && <ListItemIcon> {props.icon}</ListItemIcon>}
      </ListItem>
    </Link>
  )
}

function ShowIfLoggedIn (props) {
  const {isUserLoggedIn} = useAuth();
    useEffect (() => {
    },[isUserLoggedIn]);
    if (isUserLoggedIn) {return props.showToLoggedIn}
    return props.showToLoggedOut;
}


function App(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerItems = (
    <>
      <Typography
        variant="h4"
        className={classes.drawerTitle}
        align="center"
        display="initial"
      >
        ज्ञान लहरी
      </Typography>
      <Divider />
      <Divider />
      <Divider />
      <ListLink to="/patrika/" label="Home" />
      <Divider />
      <Divider />
      <Divider />
      <Authorised authUserTypes={auth.uts}>
        <ListLink to="/patrika/subscriberDashboard" label="Subscriber Dashboard" />
      <Divider />
      <Divider />
      <Divider />
      </Authorised>
      <Authorised authUserTypes={auth.utd}>
        <ListLink to="/patrika/distributorDashboard" label="Distributor Dashboard" />
      <Divider />
      <Divider />
      <Divider />
      </Authorised>
      <Authorised authUserTypes={auth.ualSubscriber}>
          <ListLink to="/patrika/viewAllSubscriberApplications" label="View Applications" />
        <Divider />
        <Divider />
        <Divider />
      </Authorised>
      <Authorised authUserTypes={auth.ualDistributor}>
          <ListLink to="/patrika/addNewSubscriber" label="Add Subscriber" />
        <Divider />
        <Divider />
        <Divider />
          <ListLink to="/patrika/recentlyAddedForm" label="View Recently Added" />
          <ListLink to="/patrika/searchSubscriber" label="Search Subscriber" />
          <ListLink to="/patrika/filterForm" label="Filter Subscribers" />
        <Divider />
        <Divider />
        <Divider />
          <ListLink to="/patrika/allSubscribers" label="All Subscribers" />
        <Divider />
        <Divider />
        <Divider />
          <Authorised authUserTypes={auth.utd}>
          <ListLink to="/patrika/distributionListForm" label="Distribution List" />
          <ListLink to="/patrika/expiryListForm" label="Expiry List" />
          </Authorised>
        <Authorised authUserTypes={auth.ualManager}>
          <ListLink to="/patrika/allDistributors" label="All Distributors" />
          <Authorised onlyAdmin >
            <ListLink to="/patrika/addNewDistributor" label="Add Distributor" />
          </Authorised>
          <Divider />
          <Divider />
          <Divider />
          <ListLink to="/patrika/bulkDistributionListForm" label="Print Distribution" />
          <ListLink to="/patrika/bulkExpiryListForm" label="Print Expiry" />
        </Authorised>
      </Authorised >
      <Divider />
      <Divider />
      <Divider />
      <ShowIfLoggedIn
        showToLoggedIn={<ListLink to="/patrika/logout" label="Sign Out" />}
        showToLoggedOut={<ListLink to="/patrika/loginForm" label="Sign In"/> }
        />
    </>
  );
  const drawer = (
    <>
      <Hidden mdUp>
        <div onClick={handleDrawerToggle} >
          {drawerItems}
        </div>
      </Hidden>
      <Hidden mdDown>
        <>
          <div className={classes.toolbar} />
          {drawerItems}
        </>
      </Hidden>
    </>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position="sticky"
        className={classes.appBar}
        elevation={6}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Logo />
          <Grid
            className={classes.titleBar}
            direction="row"
            container
            justify="center"
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
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <div className={classes.content}>
        <Suspense fallback={<LinearProgress />}>
          <ThemeProvider theme={theme}>
            <Suspense
              fallback={<LinearProgress />}>
              {/* <Router> */}
              <Router basepath="/patrika" >
                <LoginForm path="/loginForm" />
                <LoginBackdrop path="/loginBackdrop" />
                <Login path="/login" />
                <LoginResult path="/loginResult" />
                <Logout path="/logout" />
                <Authorised authUserTypes={auth.ualDistributor} path="/filterForm">
                  <FilterSubscriberForm path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualDistributor} path="/filterResult">
                  <FilterResult path="/" />
                </Authorised>

                <Home path="/" />
                <Authorised authUserTypes={auth.ualSubscriber} path="/viewAllSubscriberApplications">
                  <ViewAllSubscriberApplications path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualDistributor} path="/addNewSubscriber">
                  <SubscriberForm path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualManager} path="/addNewDistributor">
                    <DistributorForm path="/" />
                </Authorised> 
                <Authorised authUserTypes={auth.ualManager} path="/addDistributorResult">
                  <AddDistributorResult path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualDistributor} path="/addSubscriberResult">
                  <AddResult path="/"/>
                </Authorised>
                <Authorised authUserTypes={auth.ualDistributor} path="/viewSubscriber">
                  <ViewSubscriber path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualDistributor} path="/searchSubscriber">
                  <SearchForm path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualDistributor} path="/allSubscribers">
                  <ViewAllSubscribers path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualManager} path="/allDistributors">
                  <ViewAllDistributors path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualManager} path="/viewAddedDistributor">
                  <ViewAddedDistributor path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualDistributor} path="/searchResult">
                  <SearchResult path="/" />
                </Authorised>
                <Authorised fallback={<LoginPrompt/>} authUserTypes={auth.ualSubscriber} path="/editSubscriber">
                  <SubscriberEditForm path="/" />
                </Authorised>
                <Authorised fallback={<LoginPrompt/>} path="/editDistributor">
                   <DistributorEditForm path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualDistributor} path="/distributionList">
                  <DistributionList path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualManager} path="/bulkDistributionList">
                  <BulkDistributionList path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualDistributor} path="/distributionListForm">
                  <DistributionListForm path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualManager} path="/bulkDistributionListForm">
                  <BulkDistributionListForm path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualDistributor} path="/expiryList">
                  <ExpiryList path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualManager} path="/bulkExpiryList">
                  <BulkExpiryList path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualDistributor} path="/expiryListForm">
                  <ExpiryListForm path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualManager} path="/bulkExpiryListForm">
                  <BulkExpiryListForm path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualDistributor} path="/viewPdf">
                  <PdfView path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualDistributor} path="/downloadPdf">
                  <PdfDownload path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualDistributor} path="/recentlyAddedForm">
                  <RecentlyAddedForm path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualDistributor} path="/recentlyAddedResult">
                  <RecentlyAddedResult path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.uts} path="/subscriberDashboard">
                  <SubscriberDashboard path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.utd} path="/distributorDashboard">
                  <DistributorDashboard path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualDistributor} path="/viewSubscriberApplication">
                  <ViewSubscriberApplication path="/" />
                </Authorised>
                     {/* To catch all unmatched urls:  */}
                <Redirect default from="/*" to="/" noThrow />
              </Router>
            </Suspense>
            <Footer />
          </ThemeProvider >
        </Suspense>
      </div>
    </div>
  );
}

export default App;
