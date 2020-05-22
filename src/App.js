import React, { Suspense, useEffect } from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
// import theme from './Theme';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';

import { Router } from "@reach/router";

import ButtonLink from './Common/ButtonLink';
import LinearProgress from './Components/Progress/LinearProgressBar';
import Footer from './Components/Footer/Footer';
import PdfView from './Common/PdfViewer/PdfViewer';
import PdfDownload from './Common/PdfDownload/PdfDownload';
import Logo from './Components/Logo/Logo';



import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';


const Login = React.lazy(() => import('./Components/Login/Login'));
const Users = React.lazy(() => import('./Components/AddSubscriber/User'));
const ViewAllSubscribers = React.lazy(() => import('./Components/ViewSubscriber/ViewAllSubscribers'));
const ViewAllDistributors = React.lazy(() => import('./Components/ViewDistributor/ViewAllDistributors'));
const DistributorDetails = React.lazy(() => import('./Components/DistributorDetails/DistributorDetails'));
const SubscriberForm = React.lazy(() => import('./Components/SubscriberForm/SubscriberForm'));
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

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({

  title: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      fontSize: '6rem',
    },
  },
  drawerTitle: {
    // flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      fontSize: '3rem',
    },
  },
  paper: {
    // padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },


  root: {
    display: 'list-item',
    // flexGrow: 1,
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
    background: '#e4ded4',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    display:'list-item',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },

}));



function Home() {
  return <Logo/>;
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

  const drawer = (
    <div>
      <div className={classes.toolbar} />
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
      <ButtonLink to="/" label="Home" />
      <Divider />
      <ButtonLink to="/addNewSubscriber" label="Add Subscriber" />
      <ButtonLink to="/searchSubscriber" label="Search Subscriber" />
      <ButtonLink to="/allSubscribers" label="All Subscribers" />
      <Divider />
      <Divider />
      <Divider />
      <ButtonLink to="/addNewDistributor" label="Add Distributor" />
      <ButtonLink to="/viewDistributor" label="View Distributor" />
      <ButtonLink to="/allDistributors" label="All Distributors" />
      <Divider />
      <Divider />
      <Divider />
      <ButtonLink to="/bulkDistributionListForm" label="Print Distribution" />
      <ButtonLink to="/bulkExpiryListForm" label="Print Expiry" />
      <Divider />
      <Router>
        <ButtonLink to="/login" label="Sign In" path="/*" />
        <ButtonLink to="/" label="Sign Out" path="user/*" />
      </Router>
    </div>
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
        <Suspense>
          <ThemeProvider theme={theme}>
            <Suspense
              fallback={<LinearProgress />}>
              <Router>
                <Login path="login" />
                <Home path="/">
                  
                </Home>
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
            <Footer />
          </ThemeProvider >
        </Suspense>
      </div>
    </div>
  );
}


export default App;
