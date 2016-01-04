import React, { Component } from 'React';
import { SignIn } from './SignIn';

export var RequireAuthentication = ComposedComponent => class extends Component {
  componentWillMount() {
    this.lock = new Auth0Lock('ii2ps5L5fhI4dR1WzNY9f0bZcRL8LNGg', 'universal-call-center.auth0.com');
    this.setState({idToken: this.getIdToken()});
  }

  getIdToken() {
    var idToken = localStorage.getItem('userToken');
    var authHash = this.lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('userToken', authHash.id_token);
      }
      if (authHash.error) {
        console.log("Error signing in", authHash);
      }
    }
    return idToken;
  }

  render() {
    if (this.state.idToken) {
      return <ComposedComponent {...this.props} idToken={this.state.idToken} />;
    } else {
      return ( <SignIn lock={this.lock} /> );
    }
  }
};
