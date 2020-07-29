import React, { Component } from 'react';

class Login extends Component {
  render() {
    return(
      <a className="btn btn-primary" href="/oauth/google" role="button">Login with Google</a>
    );
  }
}

export default Login;