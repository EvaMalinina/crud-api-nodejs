import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Register extends Component {

  constructor() {
    super();
    //Set default value
    this.state = {
      email: '',
      password: ''
    }

    this.updateInputValue = this.updateInputValue.bind(this);
    this.updatePasswordValue = this.updatePasswordValue.bind(this);
  }

  componentDidMount() {
    //GET message from server using fetch api
    fetch('/api/register')
      .then(res => res.text())
      .then(res => this.setState({message: res}));
  }

  updateInputValue(evt) {
    this.setState({
      email: evt.target.value
    });
  };

  updatePasswordValue(evt) {
    this.setState({
      password: evt.target.value
    });
  };


  onSubmit = ( event ) => {
    const { history } = this.props;

    event.preventDefault();
    fetch('http://localhost:8082/api/register', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        history.push('/login');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Registration error please try again');
    });
  };

  render() {
    return (
      <div className="register" history={this.props.history}>
        <div className="container">
          <p>{this.state.message}</p>
          <form onSubmit={ this.onSubmit } >
            <label htmlFor="reg-name">Your email</label>
            <input 
              type="email"
              name="email"  
              placeholder="ivanov@icloud.com" 
              id="reg-name"
              value={this.state.email}
              onChange={this.updateInputValue}>
            </input>
            <label htmlFor="reg-pass">Create password</label>
            <input 
              type="password"
              name="password" 
              placeholder="password" 
              id="reg-pass"
              value={this.state.password}
              onChange={this.updatePasswordValue}>
            </input>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    );
  }
};

export default withRouter(Register);