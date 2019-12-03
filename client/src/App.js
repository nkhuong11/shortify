import React, {Component}from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';

import jwt_decode from 'jwt-decode';


import store from './store/store';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import NavBar from './components/Navbar';
import './App.css';

import {setLoggedIn, setLoggedOut} from './actions/authentication';
import setAuthToken from './services/setAuthToken';

export default class App extends Component {
  constructor(props){
    super(props);
    this.checkjwtToken();
    
  }

  checkjwtToken(){
    if(localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      const currentTime = Date.now() / 1000;
      if(decoded.exp < currentTime) {
        store.dispatch(setLoggedOut());
        window.location.href = '/login'
      } else {
        setAuthToken(localStorage.jwtToken); // SET request header
        store.dispatch(setLoggedIn(decoded));
      }
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar/>
            <Switch>
              <Route exact path="/login" render={props => (<LoginPage {...props}/>)}/>
              <Route exact path="/register" render={props => (<RegisterPage {...props}/>)}/>
              <Route exact path="/" render={props => (<HomePage {...props}/>)}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
