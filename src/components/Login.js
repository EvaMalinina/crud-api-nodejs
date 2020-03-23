import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message: 'Loading...',
      email : '',
      password: ''
    };
  }

  componentDidMount() {
    //GET message from server using fetch api
    fetch('/api/login')
      .then(res => res.text())
      .then(res => this.setState({message: res}));
  }
  
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  render() {
    return (
      <div className="login">
        <div className="container">
          <p>{this.state.message}</p>
          <form onSubmit={ this.onSubmit }>
            <label htmlFor="log-name">Email</label>
            <input 
              type="email"
              name="email" 
              placeholder="your email" 
              id="log-name"
              value={this.state.email}
              onChange={ this.handleInputChange }
              required>
            </input>
            <label htmlFor="log-pass">Create password</label>
            <input 
              type="password"
              name="password" 
              placeholder="password" 
              id="log-pass"
              value={this.state.password}
              onChange={this.handleInputChange}> 
            </input>
            <Link to="/notes">
              <button type="submit" value="Submit">Sign in</button>
            </Link>
          </form>
        </div>
    
      </div>
    );
  }
};