import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Home extends Component {

  render() {
    return (
      <div className="home">
        <div className="container">
          <h1 className="home__header">Hello, mate!<br></br> Please register or sign in to see notes list.</h1>
          <div className="buttons">
            <Link to="/register">
              <button type="submit" className="buttons__reg">Register</button>
            </Link>
            <Link to="/login">
              <button type="submit" className="buttons__log">Sign in</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};