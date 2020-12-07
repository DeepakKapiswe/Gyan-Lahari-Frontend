import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AppProvider } from './Contexts/AppContext';
import HomePage from './HomePage/HomePage';
import { Router } from '@reach/router';

// if you want to use concurrent mode :- uncomment this 
// ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

const Application = () => {
    return (
        <>
            <AppProvider>
                <Router>

                <HomePage path="/"/>
                <App path="/"/>
                </Router>
            </AppProvider>
        </>)
}


ReactDOM.render(<Application />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
