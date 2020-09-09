import React, { Suspense, useEffect} from 'react';
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




const Login = React.lazy(() => import('./Components/Login/Login.jsx'));
const LoginForm = React.lazy(() => import('./Components/LoginForm/LoginForm'));
const LoginBackdrop = React.lazy(() => import('./Components/LoginBackdrop/LoginBackdrop'));
const LoginResult = React.lazy(() => import('./Components/LoginResult/LoginResult'));
const ViewAllSubscribers = React.lazy(() => import('./Components/ViewSubscriber/ViewAllSubscribers'));
const ViewAllDistributors = React.lazy(() => import('./Components/ViewDistributor/ViewAllDistributors'));
const ViewAddedDistributor = React.lazy(() => import('./Components/ViewDistributor/ViewDistributor'));

const ViewSubscriber = React.lazy(() => import('./Components/ViewSubscriber/ViewSubscriber'));
const AddResult = React.lazy(() => import('./Components/AddResult/AddResult'));
const AddDistributorResult = React.lazy(() => import('./Components/AddDistributor/AddDistributorResult'));
const SubscriberForm = React.lazy(() => import('./Components/SubscriberForm/SubscriberForm'));
const SubscriberDashboard = React.lazy(() => import('./Components/SubscriberDashboard/SubscriberDashboard'));
const DistributorDashboard = React.lazy(() => import('./Components/DistributorDashboard/DistributorDashboard'));
const SubscriberEditForm = React.lazy(() => import('./Components/SubscriberEditForm/SubscriberEditForm'));
const DistributorEditForm = React.lazy(() => import('./Components/DistributorEditForm/DistributorEditForm'));
const DistributorForm = React.lazy(() => import('./Components/DistributorForm/DistributorForm'));
const SearchForm = React.lazy(() => import('./Components/SearchForm/SearchForm'));
const SearchResult = React.lazy(() => import('./Components/SearchResult/SearchResult'));
const DistributionList = React.lazy(() => import('./Components/DistributionList/DistributionList'));
const ExpiryList = React.lazy(() => import('./Components/ExpiryList/ExpiryList'));
const BulkDistributionList = React.lazy(() => import('./Components/BulkDistributionList/BulkDistributionList'));
const BulkExpiryList = React.lazy(() => import('./Components/BulkExpiryList/BulkExpiryList'));
const DistributionListForm = React.lazy(() => import('./Components/DistributionListForm/DistributionListForm'));
const ExpiryListForm = React.lazy(() => import('./Components/ExpiryListForm/ExpiryListForm'));
const BulkDistributionListForm = React.lazy(() => import('./Components/BulkDistributionListForm/BulkDistributionListForm'));
const BulkExpiryListForm = React.lazy(() => import('./Components/BulkExpiryListForm/BulkExpiryListForm'));
const RecentlyAddedForm = React.lazy(() => import('./Components/RecentlyAddedForm/RecentlyAddedForm'));
const RecentlyAddedResult = React.lazy(() => import('./Components/RecentlyAddedResult/RecentlyAddedResult'));

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
  drawerHead: {

  }

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

function App(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    document.title = `ज्ञान लहरी`;
  });

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
      <ListLink to="/" label="Home" />
      <Divider />
      <Divider />
      <Divider />
      <Authorised authUserTypes={auth.uts}>
        <ListLink to="/subscriberDashboard" label="Subscriber Dashboard" />
      </Authorised>
      <Authorised authUserTypes={auth.utd}>
        <ListLink to="/distributorDashboard" label="Distributor Dashboard" />
      </Authorised>
      <Authorised >
        <ListLink to="/addNewSubscriber" label="Add Subscriber" />
      </Authorised >
      <Authorised authUserTypes={auth.ualDistributor}>
        <Divider />
        <Divider />
        <Divider />
          <ListLink to="/recentlyAddedForm" label="View Recently Added" />
          <ListLink to="/searchSubscriber" label="Search Subscriber" />
        <Divider />
        <Divider />
        <Divider />
          <ListLink to="/allSubscribers" label="All Subscribers" />
        <Authorised authUserTypes={auth.ualManager}>
          <ListLink to="/allDistributors" label="All Distributors" />
          <Authorised onlyAdmin >
            <ListLink to="/addNewDistributor" label="Add Distributor" />
          </Authorised>
          <Divider />
          <Divider />
          <Divider />
          <ListLink to="/bulkDistributionListForm" label="Print Distribution" />
          <ListLink to="/bulkExpiryListForm" label="Print Expiry" />
        </Authorised>
      </Authorised >
      <Divider />
      <Divider />
      <Divider />
      <Router>
        <ListLink to="/loginForm" label="Sign In" path="/*" />
        <ListLink to="/" label="Sign Out" path="user/*" />
      </Router>
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
              <Router>
                <LoginForm path="/loginForm" />
                <LoginBackdrop path="/loginBackdrop" />
                <Login path="/login" />
                <LoginResult path="/loginResult" />
                <Home path="/" />
                <Authorised onlyAdmin path="/addNewSubscriber">
                  <SubscriberForm path="/" />
                </Authorised> 
                <Authorised authUserTypes={auth.ualManager} path="/addNewDistributor">
                    <DistributorForm path="/" />
                </Authorised> 
                <Authorised authUserTypes={auth.ualManager} path="/addDistributorResult">
                  <AddDistributorResult path="/" />
                </Authorised>
                <Authorised authUserTypes={auth.ualManager} path="/addSubscriberResult">
                  <AddResult path="/"/>
                </Authorised>
                <Authorised authUserTypes={auth.ualManager} path="/viewSubscriber">
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
                <Authorised fallback={<LoginPrompt/>} path="/editSubscriber">
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
                </Router>
              <Redirect default to="/" noThrow />
            </Suspense>
            <Footer />
          </ThemeProvider >
        </Suspense>
      </div>
    </div>
  );
}

export default App;
