import React, { Suspense } from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import SignIn from './Components/SignIn/SignIn';
import { FullWidthTabs } from './Components/Tab/Tab';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import useFetch from './UseFetchSuspense';

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

let url = 'https://jsonplaceholder.typicode.com/todos/1';

function get() {
  return fetch(url)
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

function SSS(props) {
  const dd = useFetch(props.url);
  return (<h1>{dd.title}</h1>);
}



function App() {
  return (
    <>

      <ThemeProvider theme={theme}>
        <NavigationBar />
        <Suspense
          fallback= <p1> Loading...</p1>
      >
      <SSS url={url} />
      <FullWidthTabs
        v1={<SignIn user="Customer" />}
        v2={<SignIn user="Distributer" />}
        v3={<SignIn user="Admin" />}
      />

    </Suspense>
    </ThemeProvider >
    </>
  );
}

export default App;
