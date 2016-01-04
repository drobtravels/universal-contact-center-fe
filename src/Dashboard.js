import React, { Component } from 'react';
import { RequireAuthentication } from './RequireAuthentication';

class DashboardComp extends Component {
  render() {
    return(
      <div>
        <p> You are authenticated </p>
      </div>
    );
  }
}

export var Dashboard = RequireAuthentication(DashboardComp)
