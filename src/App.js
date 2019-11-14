import React, { Suspense } from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import SignIn from './Components/SignIn/SignIn';
import { FullWidthTabs } from './Components/Tab/Tab';
import NavigationBar from './Components/NavigationBar/NavigationBar';


//const FullWidthTabs = React.lazy(() => import('./Components/Tab/Tab'));

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Lucida Console", 'Monaco', 'monospace'
    ].join(','),
  },
});

let cache = null;

function readCache() {
  if (cache) {
    return cache;
  }
  // we throw the fetch Promise if we don't have the data in cache
  throw get();
}


function get() {
  return fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(pokemons => {
      cache = pokemons;
    });
}

function Ss() {
  const ff = readCache();
  return (
    <div>
      <h1> {ff.title} </h1>
    </div>
  );
}




function App() {
  return (
    <>

      <ThemeProvider theme={theme}>
      <NavigationBar />
        <FullWidthTabs
          v1={<SignIn user="Customer" />} 
          v2={<SignIn user="Distributer" />} 
          v3={<SignIn user="Admin" />} 
          />
    </ThemeProvider>
    </>
  );
}

// v1={<SignIn user={"Customer"} />}
// v2={<SignIn user={"Distributor"} />}
// v3={<SignIn user={"Admin"} />}

export default App;
