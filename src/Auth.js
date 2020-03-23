import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function Auth(ComponentToProtect) {

  return class extends Component {

    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      fetch('/checkToken')
        .then(res => {
          if (res.status === 200) {
            
            this.setState({ loading: false });
            this.props.history.push('/notes');
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })

        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }
    
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  }
};