import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Notes from './components/Notes';
import Auth from './Auth';


export default class Routes extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/notes" component={Auth(Notes)} />
        </Switch>
      </Router>   
    );
  } 
}