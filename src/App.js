import React, { lazy, Suspense, useEffect} from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';

import { Router, Link, Redirect } from "@reach/router";

import LinearProgress from './Components/Progress/LinearProgressBar';
import Footer from './Components/Footer/Footer';
import PdfView from './Common/PdfViewer/PdfViewer';
import PdfDownload from './Common/PdfDownload/PdfDownload';
import Logo from './Components/Logo/Logo';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Authorised} from './Common/Authorization';
import * as auth from './Common/Authorization';
import LoginPrompt from './Components/LoginPrompt/LoginPrompt';
import Home from './Components/Home/Home';
import { useAuth } from './Hooks/AuthHooks';


const Login = lazy(() => import('./Components/Login/Login.jsx'));
const Logout = lazy(() => import('./Components/Logout/Logout'));
const LoginForm = lazy(() => import('./Components/LoginForm/LoginForm'));
const LoginBackdrop = lazy(() => import('./Components/LoginBackdrop/LoginBackdrop'));
const LoginResult = lazy(() => import('./Components/LoginResult/LoginResult'));
const ViewCurrentVolumeNum = lazy(() => import('./Components/ViewCurrentVolumeNum/ViewCurrentVolumeNum'));
const ViewAllSubscribers = lazy(() => import('./Components/ViewSubscriber/ViewAllSubscribers'));
const ViewAllDistributors = lazy(() => import('./Components/ViewDistributor/ViewAllDistributors'));
const ViewAddedDistributor = lazy(() => import('./Components/ViewDistributor/ViewDistributor'));

const ViewSubscriberApplication = lazy(() => import('./Components/ViewSubscriberApplication/ViewSubscriberApplication'));
const ViewAllSubscriberApplications = lazy(() => import('./Components/ViewSubscriberApplication/ViewAllSubscriberApplications'));
const ViewPendingSubscriberApplications = lazy(() => import('./Components/ViewSubscriberApplication/ViewPendingSubscriberApplications'));

const ViewSubscriber = lazy(() => import('./Components/ViewSubscriber/ViewSubscriber'));
const AddResult = lazy(() => import('./Components/AddResult/AddResult'));
const AddDistributorResult = lazy(() => import('./Components/AddDistributor/AddDistributorResult'));
const SubscriberForm = lazy(() => import('./Components/SubscriberForm/SubscriberForm'));
const SubscriberDashboard = lazy(() => import('./Components/SubscriberDashboard/SubscriberDashboard'));
const DistributorDashboard = lazy(() => import('./Components/DistributorDashboard/DistributorDashboard'));
const SubscriberEditForm = lazy(() => import('./Components/SubscriberEditForm/SubscriberEditForm'));
const DistributorEditForm = lazy(() => import('./Components/DistributorEditForm/DistributorEditForm'));
const DistributorForm = lazy(() => import('./Components/DistributorForm/DistributorForm'));
const SearchForm = lazy(() => import('./Components/SearchForm/SearchForm'));
const SearchResult = lazy(() => import('./Components/SearchResult/SearchResult'));
const DistributionList = lazy(() => import('./Components/DistributionList/DistributionList'));
const ExpiryList = lazy(() => import('./Components/ExpiryList/ExpiryList'));
const BulkDistributionList = lazy(() => import('./Components/BulkDistributionList/BulkDistributionList'));
const BulkExpiryList = lazy(() => import('./Components/BulkExpiryList/BulkExpiryList'));
const DistributionListForm = lazy(() => import('./Components/DistributionListForm/DistributionListForm'));
const ExpiryListForm = lazy(() => import('./Components/ExpiryListForm/ExpiryListForm'));
const BulkDistributionListForm = lazy(() => import('./Components/BulkDistributionListForm/BulkDistributionListForm'));
const BulkExpiryListForm = lazy(() => import('./Components/BulkExpiryListForm/BulkExpiryListForm'));
const RecentlyAddedForm = lazy(() => import('./Components/RecentlyAddedForm/RecentlyAddedForm'));
const RecentlyAddedResult = lazy(() => import('./Components/RecentlyAddedResult/RecentlyAddedResult'));
const FilterSubscriberForm = lazy (() => import('./Components/FilterSubscriberForm/FilterSubscriberForm'));
const FilterResult = lazy (() => import('./Components/FilterSubscriberResult/FilterSubscriberResult'));
const DistSubscribersForm = lazy(() => import('./Components/DistSubscribersForm/DistSubscribersForm'));
const DistSubscribersResult = lazy(() => import('./Components/DistSubscribersResult/DistSubscribersResult'));

const ChangeDistributorForm = lazy (() => import('./Components/ChangeDistributorForm/ChangeDistributorForm'));
const ChangeDistributorResult = lazy (() => import('./Components/ChangeDistributorResult/ChangeDistributorResult'));
const RenewalForm = lazy (() => import('./Components/RenewalForm/RenewalForm'));
const RenewResult = lazy (() => import('./Components/RenewResult/RenewResult'));
const RenewalEditForm = lazy (() => import('./Components/RenewEditForm/RenewEditForm'));
const RenewEditResult = lazy (() => import('./Components/RenewEditResult/RenewEditResult'));

const CirculationSummaryForm = lazy (() => import('./Components/CirculationSummaryForm/CirculationSummaryForm'));
const CirculationSummaryResult = lazy (() => import('./Components/CirculationSummaryResult/CirculationSummaryResult'));


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
  function openInNewTab() {
    if (props.openInNewTab !== undefined) {
      window.open(props.to);
      };
  }
  return (
    <Link to={props.to} className={classes.link} onClick={openInNewTab}>
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
          <ListLink to="/patrika/viewPendingSubscriberApplications" label="Pending Applications" />
          <ListLink to="/patrika/viewAllSubscriberApplications" label="View All Applications" />
        <Divider />
        <Divider />
        <Divider />
      </Authorised>
      <Authorised authUserTypes={auth.ualManager}>
          <ListLink to="/patrika/viewPendingUserApplications" label="My Pending Applications" />
          <ListLink to="/patrika/viewUserApplications" label="My Applications" />
        <Divider />
        <Divider />
        <Divider />
      </Authorised>
      <Authorised authUserTypes={auth.ualDistributor}>
          <ListLink to="/patrika/addNewSubscriber" label="Add Subscriber" 
            openInNewTab />
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
          <ListLink to="/patrika/distSubscribersForm" label="Dist Subscribers" />
          <ListLink to="/patrika/allDistributors" label="All Distributors" />
          <Authorised onlyAdmin >
            <ListLink to="/patrika/addNewDistributor" label="Add Distributor" />
          </Authorised>
          <Divider />
          <Divider />
          <Divider />
          <ListLink to="/patrika/bulkDistributionListForm" label="Print Distribution" />
          <ListLink to="/patrika/bulkExpiryListForm" label="Print Expiry" />
          <ListLink to="/patrika/circulationSummaryForm" label="Circulation Summary" />
        </Authorised>
      </Authorised >

      <Divider />
      <Divider />
      <Divider />
      <ShowIfLoggedIn
        showToLoggedIn={<ListLink to="/patrika/viewCurrentVolumeNum" label="Current Issue Number" />}
        showToLoggedOut={<></>}
        />
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
                <ViewCurrentVolumeNum path="/viewCurrentVolumeNum" />
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
                <Authorised authUserTypes={auth.ualSubscriber} path="/viewPendingSubscriberApplications">
                  <ViewPendingSubscriberApplications path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualManager} path="/viewUserApplications">
                  <ViewAllSubscriberApplications path="/" onlyUser />
                </Authorised>
                <Authorised authUserTypes={auth.ualManager} path="/viewPendingUserApplications">
                  <ViewPendingSubscriberApplications path="/" onlyUser />
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
                <Authorised authUserTypes={auth.ualSubscriber} path="/renewalResult">
                  <RenewResult path="/"/>
                </Authorised>
                <Authorised authUserTypes={auth.ualSubscriber} path="/renewEditResult">
                  <RenewEditResult path="/"/>
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
                <Authorised authUserTypes={auth.ualDistributor} path="/distSubscribersForm">
                  <DistSubscribersForm path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualDistributor} path="/distSubscribersResult">
                  <DistSubscribersResult path="/" />
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
                <Authorised fallback={<LoginPrompt/>} authUserTypes={auth.ualSubscriber} path="/renewSubscription">
                  <RenewalForm path="/" />
                </Authorised>
                <Authorised fallback={<LoginPrompt/>} authUserTypes={auth.ualSubscriber} path="/renewSubscriptionEditSubscriber">
                  <RenewalEditForm path="/" />
                </Authorised>
                <Authorised fallback={<LoginPrompt/>} authUserTypes={auth.ualSubscriber} path="/changeDistributor">
                  <ChangeDistributorForm path="/" />
                </Authorised>
                <Authorised fallback={<LoginPrompt/>} authUserTypes={auth.ualSubscriber} path="/changeDistributorResult">
                  <ChangeDistributorResult path="/" />
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
                <Authorised authUserTypes={auth.ualManager} path="/circulationSummaryForm">
                  <CirculationSummaryForm path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualManager} path="/circulationSummaryResult">
                  <CirculationSummaryResult path="/" />
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
                <Authorised authUserTypes={auth.ualSubscriber} path="/viewSubscriberApplication">
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
