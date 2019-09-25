import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './login/login';
import Signup from './signup/signup';
import Dashboard from './dashboard/dashboard';

const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp({
  ..........
});

const theme = createMuiTheme({
  typography: {
    fontFamily:
      "'Titillium Web','Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif"
  },
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  }
});

const routing = (
  <Router>
    <Route exact path='/login' component={Login} />
    <Route exact path='/signup' component={Signup} />
    <Route exact path='/' component={Dashboard} />
  </Router>
);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>{routing}</MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
