import React, { Component } from 'react';
import { RequireAuthentication } from './RequireAuthentication';

class DashboardComp extends Component {
  static propTypes = {
    signOut: React.PropTypes.func.isRequired,
    idToken: React.PropTypes.string.isRequired
  };

  render() {
    return(
      <div>
        <p> You are authenticated </p>
        <a href='' onClick={this.props.signOut}>Sign Out</a>
      </div>
    );
  }
}

export var Dashboard = RequireAuthentication(DashboardComp)
