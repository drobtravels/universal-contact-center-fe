import React, { Component } from 'react';
import { RequireAuthentication } from './RequireAuthentication';
import { ConnectToTwilio } from './ConnectToTwilio';
import { TaskRouterToggle } from './TaskRouterToggle';

class DashboardComp extends Component {
  static propTypes = {
    signOut: React.PropTypes.func.isRequired,
    idToken: React.PropTypes.string.isRequired,
    taskWorker: React.PropTypes.object.isRequired
  };

  render() {
    return(
      <div>
        <p>
          <span>Task Router Status: </span>
          <span>{this.props.taskWorker.activityName}</span>
        </p>
        <TaskRouterToggle taskWorker={this.props.taskWorker} />
        <span>  |  </span>
        <a href='' onClick={this.props.signOut}>Sign Out</a>
      </div>
    );
  }
}

export var Dashboard = RequireAuthentication(ConnectToTwilio(DashboardComp))
