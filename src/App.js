import React, { Suspense, useState, useEffect } from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import NavigationBar, { NavHead } from './Components/NavigationBar/NavigationBar';
import theme from './Theme';

import { Router, Link} from "@reach/router";

const Home = React.lazy(() => import('./Components/Home/Home'));
const Login = React.lazy(() => import('./Components/Login/Login'));
const User = React.lazy(() => import('./Components/User/User'));
const ButtonRouter = React.lazy(() => import('./Common/ButtonRouter'));
const ContactUs = React.lazy(() => import('./Components/ContactUs/ContactUs'));

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}



function App() {
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `Gyan Lahari`;
  });
  return (
    <ThemeProvider theme={theme}>
      <>
        <Suspense fallback={<h1>someThing</h1>} >
          <NavigationBar>
            <NavHead>
              <h1>Sri Kabir Gyan Prakashan Kendra</h1>
            </NavHead>
            <Link to="/">Home</Link>
            <Link to="contactus">ContactUs</Link>
            <Router>
              <ButtonRouter route="login" label="Sign In" path="/*" />
              <ButtonRouter route="/" label="Sign Out" path="user/*" />
            </Router>
          </NavigationBar>

        </Suspense>

        <Suspense
          fallback={<p1> Loading...</p1>}
        >
          <Router>
            <Login path="login" />
            <Home path="/" />
            <ContactUs path="contactus" />
            <User path="user/:userId" />
          </Router>
        </Suspense>
      </>
    </ThemeProvider >
  );
}

export default App;
