import React, { Component } from 'react';

export class SignIn extends Component {

  showLock = () => {
    this.props.lock.show({ authParams: {
      scope: 'openid user_metadata email'
    }});
  }

  render() {
    return (
      <div className="login-box auth0-box before">
        <p> Please Sign In to Proceed </p>
        <button onClick={this.showLock}>Sign In</button>
      </div>
    );
  }
}
