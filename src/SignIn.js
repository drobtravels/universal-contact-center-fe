import React, { Component } from 'react';
import { AppNavbar } from './AppNavbar';
import { Button } from 'react-bootstrap';

export class SignIn extends Component {
  static propTypes = {
    lock: React.PropTypes.object.isRequired
  };

  showLock = () => {
    this.props.lock.show({ authParams: {
      scope: 'openid user_metadata email'
    }});
  }

  render() {
    return (
      <div>
        <AppNavbar />
        <div className="login-box auth0-box before">
          <h2> Please Sign In to Proceed </h2>
          <Button onClick={this.showLock} bsStyle='primary' bsSize='large'>
            Sign In
          </Button>
        </div>
      </div>
    );
  }
}
