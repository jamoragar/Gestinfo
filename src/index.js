import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Cookies from 'universal-cookie';
import App from './App';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root');
const cookie = new Cookies();
const token = cookie.get('access_token');


export const renderApp = (isAuthenticated) => {
  ReactDOM.render(
    (<div className="App">
          <App authenticated={isAuthenticated} />
      </div>), root);
};

(token) ? renderApp(true) : renderApp(false);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
