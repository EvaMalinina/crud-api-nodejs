import React, { Component } from 'react';
// import { Link } from "react-router-dom";

export default class Login extends Component {

  constructor() {
    super();
    //Set default message
    this.state = {
      message: 'Loading...'
    }
  }
  componentDidMount() {
    //GET message from server using fetch api
    fetch('/api/notes')
      .then(res => res.text())
      .then(res => this.setState({message: res}));
  }

  render() {
    return (
      <div className="notes">
        <div className="container">
          <p>{this.state.message}</p>
        </div>
    
      </div>
    );
  }
};