import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Register extends Component {

  constructor() {
    super();
    //Set default message
    this.state = {
      message: 'Loading...'
    }
  }
  componentDidMount() {
    //GET message from server using fetch api
    fetch('/api/register')
      .then(res => res.text())
      .then(res => this.setState({message: res}));
  }

  render() {
    return (
      <div className="register">
        <div className="container">
          <p>{this.state.message}</p>
          <form>
            <label htmlFor="reg-name">Your email</label>
            <input 
              type="email"
              name="email"  
              placeholder="ivanov@icloud.com" 
              id="reg-name">
            </input>
            <label htmlFor="reg-pass">Create password</label>
            <input 
              type="password"
              name="password" 
              placeholder="password" 
              id="reg-pass">
            </input>
            <Link to="/login">
              <button type="submit">Register</button>
            </Link>
          </form>
        </div>
    
      </div>
    );
  }
};