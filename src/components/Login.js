import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Login extends Component {

  constructor() {
    super()
    this.state = {
      email : '',
      password: ''
    };

    this.checkInputValue = this.checkInputValue.bind(this);
    this.checkPasswordValue = this.checkPasswordValue.bind(this);
  };

  componentDidMount() {
    //GET message from server using fetch api
    fetch('/api/login')
      .then(res => res.text())
      .then(res => this.setState({message: res}));
  };

  checkInputValue(evt) {
    this.setState({
      email: evt.target.value
    });
  };

  checkPasswordValue(evt) {
    this.setState({
      password: evt.target.value
    });
  };

  onSubmit = (event) => {
    const { history } = this.props;

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
        history.push('/notes');
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
              onChange={this.checkInputValue}>
            </input>
            <label htmlFor="log-pass">Create password</label>
            <input 
              type="password"
              name="password" 
              placeholder="password" 
              id="log-pass"
              value={this.state.password}
              onChange={this.checkPasswordValue}>
            </input>
            <button type="submit">Sign in</button>
          </form>
        </div>
      </div>
    );
  }
};

export default withRouter(Login);