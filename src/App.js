import React, { Suspense, useEffect } from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import theme from './Theme';

import { Router, Link} from "@reach/router";

const Home = React.lazy(() => import('./Components/Home/Home'));
const Login = React.lazy(() => import('./Components/Login/Login'));
const Users = React.lazy(() => import('./Components/User/User'));
const ButtonRouter = React.lazy(() => import('./Common/ButtonRouter'));
const ContactUs = React.lazy(() => import('./Components/ContactUs/ContactUs'));
const ViewAllSubscribers = React.lazy(() => import('./Components/ViewSubscriber/ViewSubscribers'));

const SubscriberForm = React.lazy(() => import('./Components/SubscriberForm/SubscriberForm'));

function App() {
  useEffect(() => {
    document.title = `Gyan Lahari`;
  });
  return (
    <ThemeProvider theme={theme}>
      <>
        <Suspense fallback={<h1>someThing</h1>} >
          <NavigationBar>
            <Link to="/">Home</Link>
            <Link to="addNew">Add new</Link>
            <Link to="allsubscribers">View All Customers</Link>
            <Link to="contactus">ContactUs</Link>
            <Router>
              <ButtonRouter route="login" label="Sign In" path="/*" />
              <ButtonRouter route="/" label="Sign Out" path="user/*" />
            </Router>
          </NavigationBar>
        </Suspense>
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
